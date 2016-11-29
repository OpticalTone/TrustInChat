export class Session {
	public toEmail: string;    
	public fromName: string;   
	public fromEmail: string;  
	public securityQuestion: string;    
	public answerProof: string;
	public encryptedInitialMessage: string;
	public notifications: string;

	public user: string;

	public serverSessionId: string;
	public serverSessionIdValidation: string;
	public serverSessionSalt: string;
	public serverSessionSecret: string;

	public messageSalt: string;
	public messageSecretValidation: string;
	public messageIntegrity: string;

	public questionSalt: string;
	public encryptedQuestion: string;
	public questionSecretValidation: string;
	public questionIntegrity: string;

	constructor (toEmail?: string, 
				 fromName?: string,
				 fromEmail?: string,
				 securityQuestion?: string,
				 answerProof?: string,
				 encryptedInitialMessage?: string,
				 notifications?: string,
				 user?: string,
				 serverSessionId?: string,
				 serverSessionIdValidation?: string,
				 serverSessionSalt?: string,
				 serverSessionSecret?: string,
				 messageSalt?: string,
				 messageSecretValidation?: string,
				 messageIntegrity?: string,
				 questionSalt?: string,
				 encryptedQuestion?: string,
				 questionSecretValidation?: string,
				 questionIntegrity?: string
				 ) 
	{
		this.toEmail = toEmail;
		this.fromName = fromName;
		this.fromEmail = fromEmail;
		this.securityQuestion = securityQuestion;
		this.answerProof = answerProof;
		this.encryptedInitialMessage = encryptedInitialMessage;  
		this.notifications = notifications;
		this.user = user;
		this.serverSessionId = serverSessionId;
		this.serverSessionIdValidation = serverSessionIdValidation;
		this.serverSessionSalt = serverSessionSalt;
		this.serverSessionSecret = serverSessionSecret;
		this.messageSalt = messageSalt;
		this.messageSecretValidation = messageSecretValidation;
		this.messageIntegrity = messageIntegrity;
		this.questionSalt = questionSalt;
		this.encryptedQuestion = encryptedQuestion;
		this.questionSecretValidation = questionSecretValidation;
		this.questionIntegrity = questionIntegrity;
	}
}

