import { Component, Input } from '@angular/core';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { Message } from './message.model';
import { User } from '../../homepage/user.model';


@Component({
	selector: 'chat-message',
	templateUrl: './message.component.html',
	styles: [`
		.author {
			display: inline-block;
			font-style: italic;
			font-size: 12px;
			width: 80%;
		}
		.config {
			display: inline-block;
			text-align: right;
			font-size: 12px;
			width: 19%;
		}
	`]
})
export class MessageComponent {

	@Input() message: Message;

	constructor(private chatService: ChatService) {

	}

	onEdit() {

		this.chatService.editMessage(this.message);

	}

	onDelete() {

		this.chatService.deleteMessage(this.message)
			.subscribe(
				result => console.log(result)
			);

	}
}