import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service'

import { Message } from './message/message.model';

@Injectable()
export class ChatService {

	private messages: Message[] = [];
	
	messageEdit = new EventEmitter<Message>();

	private chatUrl = 'http://localhost:3000/chatserver';

	constructor(private http: Http, private errorService: ErrorService) {

	}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.post(this.chatUrl + '/' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(
					result.obj.content,
					result.obj.session.fromEmail, 
					result.obj.session.toEmail, 
					result.obj._id, 
					result.obj.session._id,
					result.obj.message_salt,
					null,
					result.obj.message_secret_validation,
					result.obj.message_integrity,
					result.obj.user
				);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	getMessages() {
		return this.http.get(this.chatUrl)
			.map((response: Response) => {

				const messages = response.json().obj;
				let transformedMessages: Message[] = [];

				transformedMessages[0] = new Message(
					sessionStorage.getItem('initialMessage'), 
					sessionStorage.getItem('fromEmail'),
					sessionStorage.getItem('toEmail'),
					null,
					null,
					null,
					null,
					null,
					null,
					sessionStorage.getItem('user')
					);

				for (let message of messages) {
					transformedMessages.push(new Message(
						message.content, 
						message.session.fromEmail, 
						message.session.toEmail, 
						message._id, 
						message.session._id,
						null,
						null,
						null,
						null,
						message.user
					));
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	editMessage(message: Message) {
		this.messageEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.patch(this.chatUrl + '/' + message.messageId + '/' + token, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.delete(this.chatUrl + '/' + message.messageId + '/' + token)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
}
