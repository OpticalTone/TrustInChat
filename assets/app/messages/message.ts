export class Message {
	content: string;
	messageId: string;
	userId: string;

	constructor (content: string, messageId?: string, userId?: string) {
		this.content = content;
		this.messageId = messageId;
		this.userId = userId;
	}
}