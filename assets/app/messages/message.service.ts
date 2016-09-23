import {Message} from "./message";
import {Http, Headers} from '@angular/http';
import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {
	messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();

	private chatUrl = 'http://localhost:3000/chat';

	constructor(private _http: Http) {
		
	}

	addMessage(message: Message) {

		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

		return this._http.post(this.chatUrl + '/' + token, body, {headers: headers})
			.map(response => {
				const data = response.json().obj;
				let message = new Message(data.content, data._id, data.user._id);
				return message;
			})
			.catch(error => Observable.throw(error.json()));
	}

	getMessages() {
		return this._http.get(this.chatUrl)
			.map(response => {
				const data = response.json().obj;
				let objs: any[] = [];
				for (let i = 0; i < data.length; i++) {
					let message = new Message(data[i].content, data[i]._id, data[i].user);
					objs.push(message);
				};
				return objs;
			})
			.catch(error => Observable.throw(error.json()));
	}

	updateMessage(message: Message) {

		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
		
		return this._http.patch(this.chatUrl + '/' + message.messageId + '/' + token, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));
	}

	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	deleteMessage(message: Message) {

		this.messages.splice(this.messages.indexOf(message), 1);

		const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

		return this._http.delete(this.chatUrl + '/' + message.messageId  + '/' + token)
			.map(response => response.json())
			.catch(error => Observable.throw(error.json());
	}
}