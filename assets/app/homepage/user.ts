export class User {
	toEmail: string;    
	userName: string;   
	fromEmail: string;  
	securityQuestion: string;    
	securityAnswer: string;   
	notifications: string;
	initialMessage: string;
	answer_proof: string;
	question_salt: string;
	//encrypted_question: Object;
	question_secret: string;
	question_secret_validation: string;
	question_integrity: string;

	constructor (userName: string, initialMessage: string, securityAnswer: string, toEmail?: string, fromEmail?: string, securityQuestion?: string, notifications?: string, 
		answer_proof?: string, question_salt?: string, question_secret?: string, question_secret_validation?: string, question_integrity?: string) {

		this.userName = userName;
		this.initialMessage = initialMessage;
		this.securityAnswer = securityAnswer;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;  
		this.notifications = notifications;
		this.answer_proof = answer_proof;
		this.question_salt = question_salt;
		this.question_secret = question_secret;
		this.question_secret_validation = question_secret_validation;
		this.question_integrity = question_integrity; 
	}
}