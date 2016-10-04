var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
	toEmail: { type: String, default: ''},    
	userName: { type: String, required: true},    
	fromEmail: { type: String, default: '' }, 
	//fromEmail: { type: String, required: true, unique: true },   
	securityQuestion: { type: String, default: '' },    
	notifications: { type: String, default: '' },
	initialMessage: { type: String, required: true },

	answer_proof: { type: String, default: '' },
	question_salt: { type: String, default: '' },
	//encrypted_question: Object;
	question_secret: { type: String, default: '' },
	question_secret_validation: { type: String, default: '' },
	question_integrity: { type: String, default: '' },

	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

//userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
