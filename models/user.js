var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
	toEmail: { type: String, default: ''},    
	userName: { type: String, required: true},    
	fromEmail: { type: String, default: '' }, 
	//fromEmail: { type: String, required: true, unique: true },   
	securityQuestion: { type: String, default: '' },    
	securityAnswer: { type: String, required: true },    
	notifications: { type: String, default: '' },
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

//userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
