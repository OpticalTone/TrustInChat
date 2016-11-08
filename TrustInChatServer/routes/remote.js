var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function(req, res, next) {
	User.findOne({server_session_id: req.body.server_session_id})
		.populate()
		.exec(function(err, user) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: user
			});
		});
});

router.post('/', function(req, res, next) {
	User.findOne({answer_proof: req.body.answer_proof}, function(err, user) {
		if (err) {
			return res.status(401).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!user) {
			return res.status(401).json({
				title: 'Wrong answer',
				error: {message: 'Wrong answer'}
			});
		}
		var token = jwt.sign({remoteuser: user}, 'secretstring');
		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			toEmail: user.toEmail
		});
	});
});

module.exports = router;
