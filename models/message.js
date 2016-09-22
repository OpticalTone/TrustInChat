var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var messageSchema = new Schema({
	content: {type: String, required: true},
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
