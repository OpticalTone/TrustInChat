import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Message } from "./message/message.model";

@Injectable()
export class ChatService {

	private messages: Message[] = [];
	
	messageEdit = new EventEmitter<Message>();

	private chatUrl = 'http://localhost:3000/chatserver';

	constructor(private http: Http) {

	}

	addMessage(message: Message) {

		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.chatUrl, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(
					result.obj.content,
					'Dummy', 
					'Dummy', 
					result.obj._id, 
					null,
					'Dummy',
					'Dummy',
					'Dummy',
					'Dummy',
					'Dummy'
				);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => Observable.throw(error.json()));

	}

	getMessages() {

		return this.http.get(this.chatUrl)
			.map((response: Response) => {

				const messages = response.json().obj;
				let transformedMessages: Message[] = [];

				for (let message of messages) {
					transformedMessages.push(
						new Message(
							message.content, 
							'Dummy', 
							'Dummy', 
							message._id, 
							null,
							'Dummy',
							'Dummy',
							'Dummy',
							'Dummy',
							'Dummy'
						)
					);
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => Observable.throw(error.json()));

	}

	editMessage(message: Message) {

		this.messageEdit.emit(message);

	}

	updateMessage(message: Message) {

		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.patch(this.chatUrl + '/' + message.messageId, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));

	}

	deleteMessage(message: Message) {

		this.messages.splice(this.messages.indexOf(message), 1);

		return this.http.delete(this.chatUrl + '/' + message.messageId)
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));

	}
}
