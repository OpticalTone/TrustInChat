export class Message {
	content: string;
	chatFromEmail: string;
	chatToEmail: string;
	messageId: string;
	userId: string;

	message_salt: string;
	message_secret: string;
	message_secret_validation: string;
	message_integrity: string;

	constructor (content: string, chatFromEmail?: string, chatToEmail?: string, messageId?: string, userId?: string, 
		message_salt?: string, message_secret?: string, message_secret_validation?: string, message_integrity?: string) {

		this.content = content;
		this.chatFromEmail = chatFromEmail;
		this.chatToEmail = chatToEmail;
		this.messageId = messageId;
		this.userId = userId;

		this.message_salt = message_salt;
		this.message_secret = message_secret;
		this.message_secret_validation = message_secret_validation;
		this.message_integrity = message_integrity;
	}
}