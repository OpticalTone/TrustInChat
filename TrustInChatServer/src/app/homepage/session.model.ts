export class Session {
	public toEmail: string;    
	public fromName: string;   
	public fromEmail: string;  
	public securityQuestion: string;    
	public securityAnswer: string;   
	public initialMessage: string;
	public notifications: string;

	constructor (toEmail?: string, 
				 fromName?: string,
				 fromEmail?: string,
				 securityQuestion?: string,
				 securityAnswer?: string,
				 initialMessage?: string,
				 notifications?: string) 
	{
		this.toEmail = toEmail;
		this.fromName = fromName;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;
		this.securityAnswer = securityAnswer;
		this.initialMessage = initialMessage;  
		this.notifications = notifications;
	}
}

