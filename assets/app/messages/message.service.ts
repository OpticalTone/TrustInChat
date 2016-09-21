import {Message} from "./message";
import {Http, Headers} from '@angular/http';
import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {
	messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();

	private headers = new Headers({'Content-Type': 'application/json'});
	private chatUrl = 'http://localhost:3000/chat';

	constructor(private _http: Http) {
		
	}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		return this._http.post(this.chatUrl, body, {headers: this.headers})
			.map(response => {
				const data = response.json().obj;
				let message = new Message(data.content, data._id, '1');
				return message;
			})
			.catch(error => Observable.throw(error.json().error || 'error'));
	}

	getMessages() {
		return this._http.get(this.chatUrl)
			.map(response => {
				const data = response.json().obj;
				let objs: any[] = [];
				for (let i = 0; i < data.length; i++) {
					let message = new Message(data[i].content, data[i]._id, '1');
					objs.push(message);
				};
				return objs;
			})
			.catch(error => Observable.throw(error.json().error || 'error'));
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		return this._http.patch(this.chatUrl + '/' + message.messageId , body, {headers: this.headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json(). error || 'error'));
	}

	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
		return this._http.delete(this.chatUrl + '/' + message.messageId)
			.map(response => response.json())
			.catch(error => Observable.throw(error.json(). error || 'error'));
	}
}