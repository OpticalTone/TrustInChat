var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Session = require('../models/session');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');

/*router.get('/', function(req, res, next) {

	var serverSessionId = crypto.randomBytes(8).toString('hex');

	var serverdata = '';
	serverdata = ServerData.findOne(function(err, doc) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (doc) {
			serverdata = doc.serverdata;
			console.log(serverdata);
		}
	}).sort({_id: -1});
	res.render('index', {
    	title: 'TrustInChat',
    	serverSessionId: serverSessionId
    });
});*/

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
			
			var serverSessionId = crypto.randomBytes(8).toString('hex');

			var validationString = serverSecretId + ':' + serverSessionId + ':' + serverSecret;
			var serverSessionIdValidation = crypto.createHash('sha256').update(validationString).digest('hex');

			var serverSessionSalt = crypto.randomBytes(8).toString('hex');
			var serverSessionSecret = crypto.randomBytes(8).toString('hex');

			console.log('server-secret-id: ' + serverSecretId);
			console.log('server-secret: ' + serverSecret);
			console.log('server-session-id: ' + serverSessionId);
			console.log('validationString: ' + validationString);
			console.log('server-session-id-validation: ' + serverSessionIdValidation);
			console.log('server-session-salt: ' + serverSessionSalt);
			console.log('server-session-secret: ' + serverSessionSecret);

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
		var session = new Session({
			serverSessionId: req.body.serverSessionId,
			toEmail: req.body.toEmail,  
			fromName: req.body.fromName,
			fromEmail: req.body.fromEmail,
			securityQuestion: req.body.securityQuestion,
			answer: req.body.securityAnswer,  
			notifications: req.body.notifications,
			serverdata: serverdata
		});
		var message = new Message({
			content: req.body.initialMessage,
			message_salt: req.body.message_salt,
			message_secret_validation: req.body.message_secret_validation,
			message_integrity: req.body.message_integrity,
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

			var token = jwt.sign({session: session}, 'secretstring');

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
					initialMessage: req.body.initialMessage
				});
			});
		});
	}).sort({_id: -1});
});

router.get('/remoteserver', function(req, res, next) {
	console.log(req.query.serverSessionId);
	Session.findOne({serverSessionId: req.query.serverSessionId})
		.exec(function(err, session) {
			if(err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: session
			});
		});
});

router.post('/remoteserver', function(req, res, next) {
	Session.findOne({answer: req.body.securityAnswer}, function(err, session) {
		if (err) {
			return res.status(401).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!session) {
			return res.status(401).json({
				title: 'Wrong answer',
				error: {message: 'Wrong answer'}
			});
		}

		var token = jwt.sign({session: session}, 'secretstring');

		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			session: session
		});
	});
});


module.exports = router;

