var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var LEX = require('letsencrypt-express');

var app = express();

var chatRoutes = require('./routes/chat');
var appRoutes = require('./routes/app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	// enable CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
	next();
});

app.use('/chatserver', chatRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

/*var lex = LEX.create({
  server: 'staging',	
  configDir: require('os').homedir() + '/letsencrypt/etc',
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: [hostname],
      email: '',
      agreeTos: true,
    });
  }
});

lex.onRequest = app;

lex.listen([8080], [443, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});*/

module.exports = app;
