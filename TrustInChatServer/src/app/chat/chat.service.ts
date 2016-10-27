import { Http, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Message } from "./message/message.model";

@Injectable()
export class ChatService {
	private messages: Message[] = [];

	addMessage(message: Message) {
		this.messages.push(message);
		console.log(this.messages);
	}

	getMessages() {
		return this.messages;
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}