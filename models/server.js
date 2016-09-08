var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serverSchema = new Schema({
	serverSecretId: { type: String },
	serverSecret: { type: String },
	emailServerSecret: { type: String },
	dateTime: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Server', serverSchema);
