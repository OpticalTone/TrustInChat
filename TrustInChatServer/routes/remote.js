var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Session = require('../models/session');

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
	Session.findOne({answer: req.body.answer}, function(err, session) {
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
