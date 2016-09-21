var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/user');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');

router.get('/', function(req, res, next){
	 res.render('index');
});

router.post('/', function(req, res, next){

});

router.get('/chat', function(req, res, next){
	Message.find()
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

router.post('/chat', function(req, res, next) {
	var message = new Message({
		content: req.body.content
	});
	message.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(201).json({
			message: 'Saved message',
			obj: result
		});
	});
});


module.exports = router;
