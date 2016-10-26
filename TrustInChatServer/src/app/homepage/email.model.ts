export class Email {
	public serverSessionId: string;
	public clientSessionSecret: string;

	constructor (serverSessionId?: string, clientSessionSecret?: string) {

		this.serverSessionId = serverSessionId;
		this.clientSessionSecret = clientSessionSecret;
	}
}

