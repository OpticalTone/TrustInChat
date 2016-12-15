var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	toEmail: { type: String, default: ''},    
	fromName: { type: String, required: true},    
	fromEmail: { type: String, default: '' }, 
	answerProof: { type: String, default: '' },
	notifications: { type: String, default: '' },

	serverSessionId: { type: String, default: '' },
	serverSessionIdValidation: { type: String, default: '' },
	serverSessionSalt: { type: String, default: '' },
	serverSessionSecret: { type: String, default: '' },

	emailServerNonce: { type: String, default: '' },
	emailServerSecret: { type: String, default: '' },
	emailServerSecretExpiry: {type: Date, default: ''},
	emailServerSecretProof: { type: String, default: '' },

	questionSalt: { type: String, default: '' },
	encryptedQuestion: { type: String, default: '' },
	questionSecretValidation: { type: String, default: '' },
	questionIntegrity: { type: String, default: '' },

	remoteAnswerAttempts: { type: Number, default: 0 },

	serverdata: {type: Schema.Types.ObjectId, ref: 'ServerData'},
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],

	createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Session', sessionSchema);
