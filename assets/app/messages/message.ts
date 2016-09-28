export class Message {
	content: string;
	chatFromEmail: string;
	chatToEmail: string;
	messageId: string;
	userId: string;

	constructor (content: string, chatFromEmail?: string, chatToEmail?: string, messageId?: string, userId?: string) {
		this.content = content;
		this.chatFromEmail = chatFromEmail;
		this.chatToEmail = chatToEmail;
		this.messageId = messageId;
		this.userId = userId;
	}
}