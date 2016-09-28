export class User {
	toEmail: string;    
	userName: string;   
	fromEmail: string;  
	securityQuestion: string;    
	securityAnswer: string;   
	notifications: string;
	initialMessage: string;

	constructor (userName: string, securityAnswer: string, initialMessage: string, toEmail?: string, fromEmail?: string, securityQuestion?: string, notifications?: string) {
		this.userName = userName;
		this.securityAnswer = securityAnswer;
		this.initialMessage = initialMessage;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;  
		this.notifications = notifications;
	}
}