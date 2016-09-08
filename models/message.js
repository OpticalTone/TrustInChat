var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	content: { type: String, default: '' },
	//createdAt: { type: Date, default: Date.now },
	user: { type: Schema.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('messages', messageSchema);