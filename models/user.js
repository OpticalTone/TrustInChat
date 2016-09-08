var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	toEmail: { type: String, default: ''},    
	userName: { type: String, default: ''},    
	fromEmail: { type: String, default: '' },    
	securityQuestion: { type: String, default: '' },    
	securityAnswer: { type: String, default: '' },    
	notifications: { type: String, default: '' },
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('User', userSchema);
