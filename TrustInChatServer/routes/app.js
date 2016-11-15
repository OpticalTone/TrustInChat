var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Session = require('../models/session');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
    res.render('index', {
    	title: 'TrustInChat'
    });
});

router.post('/', function(req, res, next) {

	
	var session = new Session({
		toEmail: req.body.toEmail,  
		fromName: req.body.fromName,
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,
		answer: req.body.securityAnswer,  
		notifications: req.body.notifications
	});

	

	var token = jwt.sign({session: session}, 'secretstring');

	session.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		} 

		var message = new Message({
			content: req.body.initialMessage,
			message_salt: req.body.message_salt,
			message_secret_validation: req.body.message_secret_validation,
			message_integrity: req.body.message_integrity,
			user: req.body.user,
			session: session
		});


		message.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
		});

		res.status(201).json({
			message: 'User created and logged in',
			token: token,
			fromEmail: req.body.fromEmail,
			toEmail: req.body.toEmail,
			initialMessage: req.body.initialMessage,
			session: session
		});
	});
});

router.get('/', function(req, res, next) {
	console.log(req.query.serverSessionId);
	Message.find({session: req.query.serverSessionId})
		.populate('session', 'fromEmail toEmail')
		.exec(function(err, messages) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: messages
			});
		});
});

router.get('/remoteserver', function(req, res, next) {
	console.log(req.query.serverSessionId);
	Session.findOne({_id: req.query.serverSessionId})
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

