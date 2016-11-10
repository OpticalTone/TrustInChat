var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Session = require('../models/session');

router.get('/', function(req, res, next){
    res.render('index', {
    	title: 'TrustInChat'
    });
});

router.post('/', function(req, res, next){

	var session = new Session({
		toEmail: req.body.toEmail,  
		fromName: req.body.fromName,
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,
		answer: req.body.securityAnswer,  
		initialMessage: req.body.initialMessage,
		notifications: req.body.notifications
	});

	var token = jwt.sign({session: session}, 'secretstring');

	session.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		} 

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

router.get('/remoteserver', function(req, res, next) {

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

