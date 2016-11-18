var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	toEmail: { type: String, default: ''},    
	fromName: { type: String, required: true},    
	fromEmail: { type: String, default: '' }, 
	securityQuestion: { type: String, default: '' }, 
	answer: { type: String, default: '' },
	notifications: { type: String, default: '' },

	serverSessionId: { type: String, default: '' },
	serverSessionIdValidation: { type: String, default: '' },
	serverSessionSalt: { type: String, default: '' },
	serverSessionSecret: { type: String, default: '' },

	serverdata: {type: Schema.Types.ObjectId, ref: 'ServerData'},
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Session', sessionSchema);
