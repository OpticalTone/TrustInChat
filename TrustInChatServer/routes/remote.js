var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function(req, res, next) {
	/*User.findOne()
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
		});*/
});

router.post('/', function(req, res, next) {
	User.findOne({answer_proof: req.body.answer_proof, server_session_id: req.body.server_session_id}, function(err, user) {
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
		console.log('serverSecretId: ' + req.session.serverSecretId);
		var token = jwt.sign({user: user}, 'secretstring');
		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			user: user
			//server_secret_id: req.session.serverSecretId,
			//server_session_id_validation: req.session.serverSessionIdValidation,
			//server_session_salt: req.session.serverSessionSalt,
			//server_session_secret: req.session.serverSessionSecret
		});
	});
});

module.exports = router;
