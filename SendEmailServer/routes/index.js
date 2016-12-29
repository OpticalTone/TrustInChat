var express = require('express');
var crypto = require('crypto');
var router = express.Router();

// ignored file 
var p = require('../parameters');
// make file: parameters.js in SendEmailServer root
// add content:
// var parameters = { "apiKey": "your_api_key", "timeout": 5000 };
// exports.parameters = parameters;

/* GET home page. */
router.get('/', function(req, res, next) {

	var sendinblue = require('sendinblue-api');

	var sendinObj = new sendinblue(p.parameters);

	var input = {};

	sendinObj.get_account(input, function(err, response){
	     console.log(response);
	});
	res.render('index', { title: 'SendEmailServer' });
});

router.post('/', function(req, res, next) {
	var serverSessionId = req.body.serverSessionId;
	var clientSessionSecret = req.body.clientSessionSecret;
	var toEmail = req.body.toEmail;
	var fromEmail = req.body.fromEmail;
	var fromName = req.body.fromName;

	var emailServerNonce = req.body.emailServerNonce;
	var emailServerSecretProof = req.body.emailServerSecretProof;
	var emailServerSecretExpiry = req.body.emailServerSecretExpiry;

	var chatUrl = req.body.chatUrl;

	var emailServerSecret = 'hardcoded-email-server-secret';

	var data = "email-proof:" + emailServerSecret + ":" + emailServerNonce + ":" + emailServerSecretExpiry + ":" + toEmail;
	var checkEmailServerSecretProof = crypto.createHash('sha256').update(data).digest("hex");

	var chatSessionUrl = chatUrl + serverSessionId + '#' + clientSessionSecret;

	if (checkEmailServerSecretProof != emailServerSecretProof) {
		return res.status(500).json({
			title: 'Invalid email data',
			error: err
		});
	}
	var sendinblue = require('sendinblue-api');

	var sendinObj = new sendinblue(p.parameters);

	var subject = 'Test: ' + fromName + ' has sent you a private message!';
	var html = 'A secret message from ' + fromName + ' (' + fromEmail + ') ' + 'is waiting for you here:<br>' + 
				'<a href="' + chatSessionUrl + '">' + chatSessionUrl + '</a><br><br>' + 
				'Please click the link above and answer the security question provided to view the message.<br><br>' + 
				'If the link above does not work please visit:<br>' + 
				'<a href="' + chatUrl + '">' + chatUrl + '</a><br><br>' +
				'And provide the following information...<br><br>' + 
				'Chat session id:<br>' + 
				serverSessionId + '<br><br>' +
				'Validation code:<br>' + 
				clientSessionSecret + '<br><br><br>' + 
				'This encrypted message will automatically self-destruct by ' + emailServerSecretExpiry + '<br><br>' + 
				'Thank you!<br>' + 
				'The TrustInChat.com team<br><br><br>' +
				'If you feel you are receiving this email abusively, with our apologies please forward this email to:<br>' + 
				'abuse@trustinchat.com<br><br><br><br>' ;

	var input =	{
		'to': {[toEmail]: ''},
		'from': ['secure-message@trustinchat.com', 'Secure'],
		'subject': subject,
		'html': html
	};

	sendinObj.send_email(input, function(err, response){
	    if(err){
	        console.log(err);
	    } else {
	        console.log(response);
    	}
	});

	res.status(200).json({
		message: 'Success',
		serverSessionId: serverSessionId,
		clientSessionSecret: clientSessionSecret,
		toEmail: toEmail,
		fromEmail: fromEmail,
		fromName: fromName,
		emailServerNonce: emailServerNonce,
		emailServerSecretProof: emailServerSecretProof,
		emailServerSecretExpiry: emailServerSecretExpiry
	});
});

module.exports = router;
