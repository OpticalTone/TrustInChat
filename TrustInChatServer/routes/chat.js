var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var Session = require('../models/session');

router.get('/', function(req, res, next) {
	console.log(req.query.serverSessionId);

	Session.find({serverSessionId: req.query.serverSessionId}, function(err, session) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		var sessionId = session[0]._id;
		console.log(sessionId);

		Message.find({session: sessionId})
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

	Session.findById(decoded.session._id, function(err, session) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		var message = new Message({
			content: req.body.content,
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
			session.messages.push(result);
			session.save();

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
		if (message.session != decoded.session._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
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
		if (message.session != decoded.session._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
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