export class Message {
	public content: string;
	public chatFromEmail: string;
	public chatToEmail: string;
	public messageId: string;
	public sessionId: string;

	public message_salt: string;
	public message_secret: string;
	public message_secret_validation: string;
	public message_integrity: string;

	public user: string;

	constructor (content: string, 
				 chatFromEmail?: string,
				 chatToEmail?: string,
				 messageId?: string,
				 sessionId?: string,
				 message_salt?: string, 
				 message_secret?: string, 
				 message_secret_validation?: string, 
				 message_integrity?: string,
				 user?: string) 
	{
		this.content = content;
		this.chatFromEmail = chatFromEmail;
		this.chatToEmail = chatToEmail;
		this.messageId = messageId;
		this.sessionId = sessionId;

		this.message_salt = message_salt;
		this.message_secret = message_secret;
		this.message_secret_validation = message_secret_validation;
		this.message_integrity = message_integrity;

		this.user = user;
	}
}