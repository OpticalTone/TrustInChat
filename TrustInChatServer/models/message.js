var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var messageSchema = new Schema({
	content: {type: String, required: true},

	message_salt: { type: String, default: '' },
	message_secret_validation: { type: String, default: '' },
	message_integrity: { type: String, default: '' },
	server_session_id: {type: String, default: '' },
	
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

messageSchema.post('remove', function(message) {
	User.findById(message.user, function(err, user) {
		user.messages.pull(message);
		user.save();
	});
});

module.exports = mongoose.model('Message', messageSchema);
