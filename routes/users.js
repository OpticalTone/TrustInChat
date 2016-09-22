var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function(req, res, next){
	var user = new User({
		toEmail: req.body.toEmail,   
		userName: req.body.userName,   
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,    
		securityAnswer: req.body.securityAnswer,   
		notifications: req.body.notifications
	});
	user.save(function(err, result) {
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

module.exports = router;