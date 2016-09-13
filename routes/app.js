var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/user');
var Message = require('../models/message');
var ServerData = require('../models/serverdata');

/* GET home page. */
router.get('/', function(req, res, next) {
	var server_session_id = crypto.randomBytes(16).toString('hex');
    var server_session_salt = crypto.randomBytes(16).toString('hex');
	var server_session_secret = crypto.randomBytes(16).toString('hex');

	req.session.serverSessionSalt = server_session_salt;
	req.session.serverSessionSecret = server_session_secret;

	var server_data = '';
	server_data = ServerData.findOne(function(err, doc) {
		if (err) {
			return res.send('Error');
		}
		if (doc) {
			server_data = doc.server_data;
		}
	}).sort({dateTime: -1});

	function make_validation_string(callback){
			
			server_data.exec(function(err, serverData){

			if(err) console.log(err);
			server_secret_id = serverData.serverSecretId;
			server_secret = serverData.serverSecret;

			callback(server_secret_id, server_secret);
		});
	};

	make_validation_string(function(server_secret_id, server_secret){

		
	    console.log('server_session_id: '+server_session_id);
		console.log('server_secret_id: '+server_secret_id);
		console.log('server_secret: '+server_secret);

		var validation_string = server_secret_id + ":" + server_session_id + ":" + server_secret;
		var server_session_id_validation = crypto.createHash('sha256').update(validation_string).digest("hex");
		console.log('server_session_id_validation: '+server_session_id_validation);

		req.session.serverSecretId = server_secret_id;
		req.session.serverSessionIdValidation = server_session_id_validation;
	    
	    res.render('homepage', {
	    	title: 'TrustInChat', 
	    	success: req.session.success, 
	    	errors: req.session.errors,
	    	serverSessionId: server_session_id,
	    	serverSessionIdValidation: req.session.serverSessionIdValidation,
	    	serverSecretId: req.session.serverSecretId,
	    	serverSessionSalt: server_session_salt,
	    	serverSessionSecret: server_session_secret
	    });
	    req.session.errors = null;
    });
});



router.post('/chat', function(req, res, next) {

	var toEmail = req.body.toEmail;
	var fromEmail = req.body.fromEmail;

	req.session.toEmail = toEmail;
	req.session.fromEmail = fromEmail;


	// Check validity
	req.check('toEmail', 'Invalid To e-mail address').isEmail();
	req.check('fromEmail', 'Invalid From e-mail address').isEmail();
	req.check('securityAnswer', 'Security answer is invalid').isLength({min: 4}).equals(req.body.securityAnswerRep);

	var errors = req.validationErrors();
	if (errors) {
		req.session.errors = errors;
		req.session.success =false;
		res.redirect('/');
	} else {
		req.session.success = true;
		res.redirect('/chat');
	}
	
	var user_item = {
		toEmail: req.body.toEmail,
		userName: req.body.fromName,
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,
		securityAnswer: req.body.securityAnswer,
		notifications: req.body.notifications
	};


	
	var user_data = new User(user_item);
	user_data.save(function(err, savedUser) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		
		var message_item = {
			content: req.body.content
		};

		var message_data = new Message(message_item);
		message_data.save(function(err, savedMessage){
			if (err){
				console.log(err);
				return res.status(500).send();
			}
			return res.status(200).send();
		});

		return res.status(200).send();
	});
	
	
});


router.get('/chat', function(req, res) {
	res.render('chat', {title:"CHAT", toEmail: req.session.toEmail, fromEmail: req.session.fromEmail});
});






module.exports = router;