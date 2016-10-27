var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var messageSchema = new Schema({
	content: {type: String, required: true},

	message_salt: { type: String, default: '' },
	message_secret: { type: String, default: '' },
	message_secret_validation: { type: String, default: '' },
	message_integrity: { type: String, default: '' },
	server_session_id: {type: String, default: '' },
	
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

messageSchema.post('remove', function(doc) {
	var msgDeleted = doc;
	User.findById(doc.user, function(err, doc) {
		doc.messages.pull(msgDeleted);
		doc.save();
	});
});

module.exports = mongoose.model('Message', messageSchema);
