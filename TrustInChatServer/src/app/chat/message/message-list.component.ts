import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { MessageComponent } from './message.component';

import { Message } from './message.model';


@Component({
	selector: 'chat-message-list',
	template: `
		<div class="col-md-8 col-md-offset-2">
			<chat-message *ngFor="let message of messages" [message]="message"></chat-message>
		</div>
	`
})
export class MessageListComponent implements OnInit {

	messages: Message[];

	constructor(private chatService: ChatService) {

	}

	ngOnInit() {
		this.chatService.getMessages()
			.subscribe(
				(messages: Message[]) => {
					this.messages = messages;
				}
			);
	}
}