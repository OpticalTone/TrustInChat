var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function(req, res, next) {

	Message.find()
		.populate('user', 'fromEmail toEmail')
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

router.use('/', function(req, res, next) {

	jwt.verify(req.query.token, 'secretstring', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Authentication failed',
				error: err
			});
		}
		next();
	});

});

router.post('/', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function(err, user) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: user
			//message_salt: req.body.message_salt,
			//message_secret: req.body.message_secret,
			//message_secret_validation: req.body.message_secret_validation,
			//message_integrity: req.body.message_integrity,
			//server_session_id: req.body.server_session_id
		});

		message.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			user.messages.push(result);
			user.save();

			res.status(201).json({
				message: 'Saved message',
				obj: result
			});
		});
	});
	

});

router.patch('/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'No Message Found',
				error: {message: 'Message not found!'}
			});
		}
		if (message.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Authentication failed',
				error: {message: 'Users do not match'}
			});
		}
		message.content = req.body.content;
		message.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Updated message',
				obj: result
			});
		});
	});
});

router.delete('/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'No Message Found',
				error: {message: 'Message not found!'}
			});
		}
		if (message.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Authentication failed',
				error: {message: 'Users do not match'}
			});
		}
		message.remove(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Deleted message',
				obj: result
			});
		});
	});
});

module.exports = router;