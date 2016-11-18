export class Message {
	public content: string;
	public chatFromEmail: string;
	public chatToEmail: string;
	public messageId: string;
	public sessionId: string;

	public messageSalt: string;
	public messageSecret: string;
	public messageSecretValidation: string;
	public messageIntegrity: string;

	public user: string;

	constructor (content: string, 
				 chatFromEmail?: string,
				 chatToEmail?: string,
				 messageId?: string,
				 sessionId?: string,
				 messageSalt?: string, 
				 messageSecret?: string, 
				 messageSecretValidation?: string, 
				 messageIntegrity?: string,
				 user?: string
				 ) 
	{
		this.content = content;
		this.chatFromEmail = chatFromEmail;
		this.chatToEmail = chatToEmail;
		this.messageId = messageId;
		this.sessionId = sessionId;

		this.messageSalt = messageSalt;
		this.messageSecret = messageSecret;
		this.messageSecretValidation = messageSecretValidation;
		this.messageIntegrity = messageIntegrity;

		this.user = user;
	}
}