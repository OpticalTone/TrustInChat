var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');


router.get('/', function(req, res, next){
	 res.render('index');
});

router.post('/', function(req, res, next){

	var user = new User({
		toEmail: req.body.toEmail,   
		userName: req.body.userName,   
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,    
		securityAnswer: req.body.securityAnswer,   
		notifications: req.body.notifications
	});

	var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

	user.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(200).json({
			message: 'Success',
			token: token,
			userId: user._id,
			obj: result
		});
	});
});

router.get('/chat', function(req, res, next){
		Message.find()
		//.populate('user', 'userName')
		.exec(function(err, docs) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: docs
			});
		});
});

router.use('/chat', function(req, res, next) {
	jwt.verify(req.query.token, 'secret', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Authentication failed',
				error: err
			});
		}
		next();
	});
});

router.post('/chat', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: doc
		});
		message.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			doc.messages.push(result);
			doc.save();
			res.status(201).json({
				message: 'Saved message',
				obj: result
			});
		});
	});
});

router.patch('/chat/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
			});
		}
		doc.content = req.body.content;
		doc.save(function(err, result) {
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
});

router.delete('/chat/:id', function(req, res, next) {

	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Not Authorized',
				error: err
			});
		}
		doc.remove(function(err, result) {
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
});


module.exports = router;
