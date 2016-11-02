var express = require('express');
var router = express.Router();

var p = require('../parameters');

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

	console.log(serverSessionId);
	console.log(clientSessionSecret);

	var sendinblue = require('sendinblue-api');

	var sendinObj = new sendinblue(p.parameters);

	var input =	{ 'to': { 'ivana@opticaltone.com': 'to whom!' },
		'from': ['ivana@opticaltone.com', 'from email!'],
		'subject': 'Test mail form sendinblue',
		'html': 'serverSessionId: ' + serverSessionId
				+ '<br><br>' +
				'clientSessionSecret: ' + clientSessionSecret
	};

	sendinObj.send_email(input, function(err, response){
	    console.log(response);
	});

	res.status(200).json({
		message: 'Success',
		serverSessionId,
		clientSessionSecret
	});
});

module.exports = router;
