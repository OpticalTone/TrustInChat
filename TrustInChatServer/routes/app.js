var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Session = require('../models/session');


router.get('/', function(req, res, next){
    res.render('index', {
    	title: 'TrustInChat', 
    	success: 'success', 
    	errors: error,
    	session: session
    });
});

router.post('/', function(req, res, next){

	var session = new Session({
		toEmail: req.body.toEmail,  
		fromName: req.body.fromName,
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,
		answer: req.body.answer,  
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
			initialMessage: req.body.initialMessage,
			obj: result
		});
	});
});

module.exports = router;

