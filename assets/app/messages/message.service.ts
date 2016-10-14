import {Message} from "./message";
import {Http, Headers} from '@angular/http';
import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import * as CryptoJS from 'crypto-js';

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
				let message = new Message(data.content, data.user.fromEmail, data.user.toEmail, data._id, data.user._id, 
					data.message_salt, data.message_secret, data.message_secret_validation, data.message_integrity, 
					data.server_session_id);
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
					let message = new Message(data[i].content, data[i].user.fromEmail, data[i].user.toEmail, data[i]._id, data[i].user._id);
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
			.catch(error => Observable.throw(error.json()));
	}

	private generateRandomString(len) {
		var text = " ";
		var characters = "abcdefghijklmnopqrstuvwxyz0123456789";

		for(var i = 0; i < len; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	}
}