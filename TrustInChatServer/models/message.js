var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Session= require('./session');

var messageSchema = new Schema({
	content: {type: String, required: true},

	message_salt: { type: String, default: '' },
	message_secret_validation: { type: String, default: '' },
	message_integrity: { type: String, default: '' },
	
	session: {type: Schema.Types.ObjectId, ref: 'Session'}
});

messageSchema.post('remove', function(message) {
	Session.findById(message.session, function(err, session) {
		session.messages.pull(message);
		session.save();
	});
});

module.exports = mongoose.model('Message', messageSchema);
