import {Message} from "./message";
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {
	messages: Message[] = [];

	constructor(private _http: Http) {
		
	}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this._http.post('http://localhost:3000/chat', body, {headers: headers})
			.map(response => {
				const data = response.json().obj;
				let message = new Message(data.content, data._id, '1');
				return message;
			})
			.catch(error => Observable.throw(error.json()));
	}

	getMessages() {
		return this._http.get('http://localhost:3000/chat')
			.map(response => {
				const data = response.json().obj;
				let objs: any[] = [];
				for (let i = 0; i < data.length; i++) {
					let message = new Message(data[i].content, data[i]._id, '1');
					objs.push(message);
				};
				return objs;
			})
			.catch(error => Observable.throw(error.json()));
	}

	editMessage(message: Message) {
		this.messages[this.messages.indexOf(message)] = new Message('Edited', null, '1');
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}