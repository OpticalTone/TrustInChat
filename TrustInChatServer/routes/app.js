var express = require('express');
var router = express.Router();
var bcryptjs = require('bcryptjs');

var User = require('../models/user');

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
		question_secret: req.body.question_secret,
		question_secret_validation: req.body.question_secret_validation,
		question_integrity: req.body.question_integrity
		// password: bcryptjs.hashSync(req.body.password, 10)
	});
	user.save(function(req, result) {
		if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(201).json({
				message: 'User created',
				obj: result
			});
	});

});

module.exports = router;
