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

module.exports = router;
