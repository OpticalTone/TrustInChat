export class User {
	toEmail: string;    
	userName: string;   
	fromEmail: string;  
	securityQuestion: string;    
	securityAnswer: string;   
	notifications: string;

	constructor (userName: string, securityAnswer: string, toEmail?: string, fromEmail?: string, securityQuestion?: string, notifications?: string) {
		this.userName = userName;
		this.securityAnswer = securityAnswer;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;  
		this.notifications = notifications;
	}
}