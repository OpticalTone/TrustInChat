var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Session= require('./session');

var messageSchema = new Schema({
	encryptedMessage: { type: String, required: true },
	messageSalt: { type: String, default: '' },
	messageSecretValidation: { type: String, default: '' },
	messageIntegrity: { type: String, default: '' },

	user: { type: String, default: '' },
	
	session: {type: Schema.Types.ObjectId, ref: 'Session'},

	createdAt: {type: Date, default: Date.now}
});

messageSchema.post('remove', function(message) {
	Session.findById(message.session, function(err, session) {
		session.messages.pull(message);
		session.save();
	});
});

module.exports = mongoose.model('Message', messageSchema);
