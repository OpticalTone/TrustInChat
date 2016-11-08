var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var randomstring = require('randomstring');

var User = require('../models/user');
var ServerData = require('../models/serverdata');



router.get('/', function(req, res, next){
	
	var server_session_id = crypto.randomBytes(16).toString('hex');
    var server_session_salt = crypto.randomBytes(16).toString('hex');
	var server_session_secret = crypto.randomBytes(16).toString('hex');

	req.session.serverSessionId = server_session_id;
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
	    
	    res.render('index', {
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

router.post('/', function(req, res, next){

	var user = new User({
		toEmail: req.body.toEmail,   
		userName: req.body.userName,   
		fromEmail: req.body.fromEmail,
		securityQuestion: req.body.securityQuestion,    
		notifications: req.body.notifications,
		initialMessage: req.body.initialMessage,
		answer_proof: req.body.answer_proof,
		shared_secret: req.body.shared_secret,
		question_salt: req.body.question_salt,
		//encrypted_question: Object;
		question_secret_validation: req.body.question_secret_validation,
		question_integrity: req.body.question_integrity,
		server_session_id: req.body.server_session_id
	});

	//req.session.initialMessage = req.body.initialMessage;
	//req.session.answer_proof = req.body.answer_proof;
	//req.session.shared_secret = req.body.shared_secret;
	//req.session.question_salt = req.body.question_salt;
	//encrypted_question: Object;
	//req.session.question_secret_validation = req.body.question_secret_validation;
	//req.session.question_integrity = req.body.question_integrity;

	var email_server_nonce = randomstring.generate(8);
	var email_server_secret  = 'foo-bar-baz'
	var email_server_secret_expiry = moment().valueOf();
	var to_email_address = req.body.toEmail;
	var proof_string = "email-proof:" + email_server_secret + ':' + email_server_nonce + ':' + 
						email_server_secret_expiry + ':' + to_email_address;
	var email_server_secret_proof = crypto.createHash("sha256").update(proof_string).digest("base64");

	req.session.emailServerNonce = email_server_nonce;
	req.session.emailServerSecret = email_server_secret;
	req.session.emailServerSecretExpiry = email_server_secret_expiry;
	req.session.emailSeverSecretProof = email_server_secret_proof;

	console.log(email_server_secret);
	console.log(email_server_secret_expiry);
	console.log(to_email_address);
	console.log(proof_string);
	console.log(email_server_secret_proof);

	//var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
	var token = jwt.sign({user: user}, 'secretstring');

	user.save(function(err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		} 

		res.status(201).json({
			message: 'User created and logged in',
			token: token,
			userId: user._id,
			email_server_nonce,
			email_server_secret_proof,
			email_server_secret_expiry,
			toEmail: req.body.toEmail,
			fromEmail: req.body.fromEmail,
			initialMessage: req.body.initialMessage,
			obj: result
		});
	});
});

module.exports = router;

