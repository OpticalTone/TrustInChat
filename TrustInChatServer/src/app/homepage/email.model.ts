export class Email {
	public serverSessionId: string;
	public clientSessionSecret: string;
	public toEmail: string;
	public fromEmail: string;
	public fromName: string;

	constructor (serverSessionId?: string, clientSessionSecret?: string, toEmail?: string, fromEmail?: string, fromName?: string) {

		this.serverSessionId = serverSessionId;
		this.clientSessionSecret = clientSessionSecret;
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.fromName = fromName;
	}
}

