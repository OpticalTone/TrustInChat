export class User {
	toEmail: string;    
	userName: string;   
	fromEmail: string;  
	securityQuestion: string;    
	securityAnswer: string;   
	notifications: string;
	initialMessage: string;

	constructor (userName: string, initialMessage: string, securityAnswer?: string, toEmail?: string, fromEmail?: string, securityQuestion?: string, notifications?: string) {
		this.userName = userName;
		this.initialMessage = initialMessage;
		this.securityAnswer = securityAnswer;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;  
		this.notifications = notifications;
	}
}