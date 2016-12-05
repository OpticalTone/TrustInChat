var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	toEmail: { type: String, default: ''},    
	fromName: { type: String, required: true},    
	fromEmail: { type: String, default: '' }, 
	securityQuestion: { type: String, default: '' }, 
	answerProof: { type: String, default: '' },
	notifications: { type: String, default: '' },

	serverSessionId: { type: String, default: '' },
	serverSessionIdValidation: { type: String, default: '' },
	serverSessionSalt: { type: String, default: '' },
	serverSessionSecret: { type: String, default: '' },

	questionSalt: { type: String, default: '' },
	encryptedQuestion: { type: String, default: '' },
	questionSecretValidation: { type: String, default: '' },
	questionIntegrity: { type: String, default: '' },

	remoteAnswerAttempts: { type: Number, default: 0 },

	serverdata: {type: Schema.Types.ObjectId, ref: 'ServerData'},
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Session', sessionSchema);
