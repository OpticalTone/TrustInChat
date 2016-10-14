var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');


router.get('/', function(req, res, next){
	
	var server_session_id = crypto.randomBytes(16).toString('hex');
    var server_session_salt = crypto.randomBytes(16).toString('hex');
	var server_session_secret = crypto.randomBytes(16).toString('hex');

	req.session.serverSessionId = server_session_id;
	req.session.serverSessionSalt = server_session_salt;
	req.session.serverSessionSecret = server_session_secret;

	var server_data = '';
	server_data = ServerData.findOne(function(err, doc) {
		if (err) {
			return res.send('Error');
		}
		if (doc) {
			server_data = doc.server_data;
		}
	}).sort({dateTime: -1});

	function make_validation_string(callback){
			
			server_data.exec(function(err, serverData){

			if(err) console.log(err);
			server_secret_id = serverData.serverSecretId;
			server_secret = serverData.serverSecret;

			callback(server_secret_id, server_secret);
		});
	};

	make_validation_string(function(server_secret_id, server_secret){
		
	    console.log('server_session_id: '+server_session_id);
		console.log('server_secret_id: '+server_secret_id);
		console.log('server_secret: '+server_secret);

		var validation_string = server_secret_id + ":" + server_session_id + ":" + server_secret;
		var server_session_id_validation = crypto.createHash('sha256').update(validation_string).digest("hex");
		console.log('server_session_id_validation: '+server_session_id_validation);

		req.session.serverSecretId = server_secret_id;
		req.session.serverSessionIdValidation = server_session_id_validation;
	    
	    res.render('index', {
	    	title: 'TrustInChat', 
	    	success: req.session.success, 
	    	errors: req.session.errors,
	    	serverSessionId: server_session_id,
	    	serverSessionIdValidation: req.session.serverSessionIdValidation,
	    	serverSecretId: req.session.serverSecretId,
	    	serverSessionSalt: server_session_salt,
	    	serverSessionSecret: server_session_secret
	    });
	    req.session.errors = null;
    });
});

router.post('/', function(req, res, next){

	var user = new User({
		toEmail: req.body.toEmail,   
		userName: req.body.userName,   
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,    
		notifications: req.body.notifications,
		initialMessage: req.body.initialMessage,
		answer_proof: req.body.answer_proof,
		question_salt: req.body.question_salt,
		//encrypted_question: Object;
		question_secret: req.body.question_secret,
		question_secret_validation: req.body.question_secret_validation,
		question_integrity: req.body.question_integrity
	});

	//var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
	var token = jwt.sign({user: user}, 'secret');

	user.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		} 

		res.status(200).json({
			message: 'Success',
			token: token,
			userId: user._id,
			toEmail: req.body.toEmail,
			fromEmail: req.body.fromEmail,
			initialMessage: req.body.initialMessage,
			obj: result
		});
	});
});

router.get('/chat', function(req, res, next){
		Message.find({server_session_id: req.body.server_session_id})
		.populate('user', 'fromEmail toEmail')
		.exec(function(err, docs) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: docs
			});
		});
});

router.use('/chat', function(req, res, next) {
	jwt.verify(req.query.token, 'secret', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Authentication failed',
				error: err
			});
		}
		next();
	});
});

router.post('/chat', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: doc,
			message_salt: req.body.message_salt,
			message_secret: req.body.message_secret,
			message_secret_validation: req.body.message_secret_validation,
			message_integrity: req.body.message_integrity,
			server_session_id: req.body.server_session_id
		});
		message.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			doc.messages.push(result);
			doc.save();
			res.status(201).json({
				message: 'Saved message',
				obj: result
			});
		});
	});
});

router.patch('/chat/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
			});
		}
		doc.content = req.body.content;
		doc.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: result
			});
		});
	});
});

router.delete('/chat/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
			});
		}
		doc.remove(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: result
			});
		});
	});
});


module.exports = router;
