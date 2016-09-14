export class Message {
	content: string;
	userName: string;
	messageId: string;
	userId: string;

	constructor (content: string, messageId?: string, userId?: string) {
		this.content = content;
		this.messageId = messageId;
		this.userId = userId;
	}
}