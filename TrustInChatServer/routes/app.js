var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var Session = require('../models/session');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');

router.get('/', function(req, res, next) {
	ServerData.findOne()
		.sort({_id: -1})
		.exec(function(err, serverdata) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			var serverSecretId = serverdata.serverSecretId;
			var serverSecret = serverdata.serverSecret;
			
			// when the home page loads
			// cryptographic random strings generated
			var serverSessionId = crypto.randomBytes(8).toString('hex');

			var validationString = serverSecretId + ':' + serverSessionId + ':' + serverSecret;
			var serverSessionIdValidation = crypto.createHash('sha256').update(validationString).digest('hex');

			var serverSessionSalt = crypto.randomBytes(8).toString('hex');
			var serverSessionSecret = crypto.randomBytes(8).toString('hex');

			res.render('index', {
		    	title: 'TrustInChat',
		    	serverSecretId: serverSecretId,
		    	serverSessionId: serverSessionId,
		    	serverSessionIdValidation: serverSessionIdValidation,
		    	serverSessionSalt: serverSessionSalt,
		    	serverSessionSecret: serverSessionSecret
		    });
		});
}); 

router.post('/', function(req, res, next) {
	ServerData.findOne(function(err, serverdata) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		// send email
		var emailServerNonce = crypto.randomBytes(8).toString('hex');
		var emailServerSecret = 'hardcoded-email-server-secret';
		var emailServerSecretExpiry = new Date().toISOString();

		var data = "email-proof:" + emailServerSecret + ":" + emailServerNonce + ":" + emailServerSecretExpiry + ":" + req.body.toEmail;
		var emailServerSecretProof = crypto.createHash('sha256').update(data).digest("hex");

		var session = new Session({
			toEmail: req.body.toEmail,  
			fromName: req.body.fromName,
			fromEmail: req.body.fromEmail,
			answerProof: req.body.answerProof,  
			notifications: req.body.notifications,
			serverSessionId: req.body.serverSessionId,
			serverSessionIdValidation: req.body.serverSessionIdValidation,
			serverSessionSalt: req.body.serverSessionSalt,
			serverSessionSecret: req.body.serverSessionSecret,
			emailServerNonce: emailServerNonce,
			emailServerSecret: emailServerSecret,
			emailServerSecretExpiry: emailServerSecretExpiry,
			emailServerSecretProof: emailServerSecretProof,
			questionSalt: req.body.questionSalt,
			questionSecretValidation: req.body.questionSecretValidation,
			questionIntegrity: req.body.questionIntegrity,
			encryptedQuestion: req.body.encryptedQuestion,
			serverdata: serverdata
		});

		var message = new Message({
			encryptedMessage: req.body.encryptedInitialMessage,
			messageSalt: req.body.messageSalt,
			messageSecretValidation: req.body.messageSecretValidation,
			messageIntegrity: req.body.messageIntegrity,
			user: req.body.user,
			session: session
		});

		message.save(function(err, resultMessage) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			session.messages.push(resultMessage);
			var cert = fs.readFileSync(path.join(__dirname, 'rsa', 'private.key'));
			var token = jwt.sign({session: session}, cert, { algorithm: 'RS256'});

			session.save(function(err, result) {
				if (err) {
					return res.status(500).json({
						title: 'An error occurred',
						error: err
					});
				} 
				serverdata.sessions.push(result);
				serverdata.save();

				res.status(201).json({
					message: 'User created and logged in',
					token: token,
					fromEmail: req.body.fromEmail,
					fromName: req.body.fromName,
					toEmail: req.body.toEmail,
					encryptedInitialMessage: req.body.encryptedInitialMessage,
					emailServerNonce: emailServerNonce,
					emailServerSecretProof: emailServerSecretProof,
					emailServerSecretExpiry: emailServerSecretExpiry
				});
			});
		});
	}).sort({_id: -1});
});

router.delete('/:serverSessionId', function(req, res, next) {
	Session.findOne(req.params.serverSessionId, function(err, session) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!session) {
			return res.status(500).json({
				title: 'No Session Found',
				error: {message: 'Session not found!'}
			});
		}
		var sessionId = session[0]._id;

		Message.find({session: sessionId}, function(err, messages) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			messages.remove(function(err, removed) {
				if (err) {
					return res.status(500).json({
						title: 'An error occurred',
						error: err
					});
				}
				res.status(200).json({
					message: 'Messages deleted',
					obj: result
				});
			});
		});

		session.remove(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Session deleted',
				obj: result
			});
		});
	});
});

router.get('/remoteserver', function(req, res, next) {
	ServerData.findOne(function(err, serverdata) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		var serverSecretId = serverdata.serverSecretId;

		Session.findOne({serverSessionId: req.query.serverSessionId})
			.exec(function(err, session) {
				if(err) {
					return res.status(500).json({
						title: 'An error occurred',
						error: err
					});
				}
				var toEmail = session.toEmail;
				var fromName = session.fromName;
				var fromEmail = session.fromEmail;
				var serverSessionId = session.serverSessionId;
				var serverSessionIdValidation = session.serverSessionIdValidation;
				var serverSessionSalt = session.serverSessionSalt;
				var serverSessionSecret = session.serverSessionSecret;
				var questionSalt = session.questionSalt;
				var encryptedQuestion = session.encryptedQuestion;
				var questionIntegrity = session.questionIntegrity;

				res.status(200).json({
					serverSecretId: serverSecretId,
					toEmail: toEmail,
					fromName: fromName,
					fromEmail: fromEmail,
					serverSessionId: serverSessionId,
					serverSessionIdValidation: serverSessionIdValidation,
					serverSessionSalt: serverSessionSalt,
					serverSessionSecret: serverSessionSecret,
					questionSalt: questionSalt,
					encryptedQuestion: encryptedQuestion,
					questionIntegrity: questionIntegrity
				});
			});
	}).sort({_id: -1});		
});

router.post('/remoteserver', function(req, res, next) {
	Session.findOne({serverSessionId: req.body.serverSessionId}, function(err, sess) {
		if (err) {
			return res.status(401).json({
				title: 'An error occurred',
				error: err
			});
		}

		if (!sess) {
			return res.status(401).json({
				title: 'Message is permanently deleted.',
				error: {message: 'Message is permanently deleted.'}
			});
		}
		var sessionId = sess._id;
		var attempts = sess.remoteAnswerAttempts;

		Session.findOne({questionSecretValidation: req.body.questionSecretValidation}, function(err, s) {
			if (err) {
				return res.status(401).json({
					title: 'An error occurred',
					error: err
				});
			}
			if (!s) {
				return res.status(401).json({
					title: '0',
					error: {message: 'Session is invalid.'}
				});
			}
			Session.findOne({answerProof: req.body.answerProof}, function(err, session) {
				if (err) {
					return res.status(401).json({
						title: 'An error occurred',
						error: err
					});
				}
				if (!session) {

					attempts += 1;
					var msg = '';
					var title = '';

					if (6 - attempts < 0) {
						return res.status(401).json({
							title: '0',
							error: {message: 'Message is permanently deleted.'}
						});
					} 
					if (6 - attempts == 0) {
						msg = 'Message is permanently deleted.';

						title = '0';

						Message.findOneAndRemove({session: sessionId})
							.exec();

						Session.findOneAndRemove({serverSessionId: req.body.serverSessionId})
							.exec(function(err, result) {
								if (err) {
									return res.status(401).json({
										title: 'An error occurred',
										error: err
									});
								}
							});

						return res.status(401).json({
							title: title,
							error: {message: msg}
						});
					}
					else if (6 - attempts == 3) {
						msg = 'You have ' + (6 - attempts) + ' attempts remaining to answer the security question correctly before ' + 
							  'message is permanently deleted. You may retry again in 20 seconds.';

						title = (6 - attempts) + ' attempts remaining';

						Session.findOneAndUpdate({serverSessionId: req.body.serverSessionId}, {$inc: {remoteAnswerAttempts: 1}})
							.select('remoteAnswerAttempts').exec(function(err, result) {
								if (err) {
									return res.status(401).json({
										title: 'An error occurred',
										error: err
									});
								}
							});
						return res.status(401).json({
							title: title,
							error: {message: msg}
						});
					}
					else {
						msg = 'You have ' + (6 - attempts) + ' attempts remaining to answer the security question correctly before ' + 
							  'message is permanently deleted.';

						title = (6 - attempts) + ' attempts remaining';

						Session.findOneAndUpdate({serverSessionId: req.body.serverSessionId}, {$inc: {remoteAnswerAttempts: 1}})
								.select('remoteAnswerAttempts').exec(function(err, result) {
									if (err) {
										return res.status(401).json({
											title: 'An error occurred',
											error: err
										});
									}
								});
						return res.status(401).json({
							title: title,
							error: {message: msg}
						});
					}
				}

				var cert = fs.readFileSync(path.join(__dirname, 'rsa', 'private.key'));
				var token = jwt.sign({session: session}, cert, { algorithm: 'RS256'});
				//var token = jwt.sign({session: session}, 'secretstring');

				res.status(200).json({
					message: 'Successfully logged in',
					token: token,
					session: session
				});
			});
		});
	});
});

module.exports = router;

