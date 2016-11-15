
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serverSchema = new Schema({
	serverSecretId: { type: String },
	serverSecret: { type: String },

	sessions: [{type: Schema.Types.ObjectId, ref: 'Session'}] 
});

module.exports = mongoose.model('ServerData', serverSchema);