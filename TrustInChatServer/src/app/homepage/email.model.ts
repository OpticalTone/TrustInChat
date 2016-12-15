export class Email {
	public serverSessionId: string;
	public clientSessionSecret: string;
	public toEmail: string;
	public fromEmail: string;
	public fromName: string;
	public emailServerNonce: string;
	public emailServerSecretProof: string;
	public emailServerSecretExpiry: string;

	constructor (serverSessionId?: string, 
				 clientSessionSecret?: string, 
				 toEmail?: string, 
				 fromEmail?: string, 
				 fromName?: string,
				 emailServerNonce?: string,
				 emailServerSecretProof?: string,
				 emailServerSecretExpiry?: string
				 ) 
	{
		this.serverSessionId = serverSessionId;
		this.clientSessionSecret = clientSessionSecret;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.fromName = fromName;
		this.emailServerNonce = emailServerNonce;
		this.emailServerSecretProof = emailServerSecretProof;
		this.emailServerSecretExpiry = emailServerSecretExpiry;
	}
}

