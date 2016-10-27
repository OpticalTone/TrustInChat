import { Component, Input, Output, EventEmitter } from '@angular/core';

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
	@Output() editClicked = new EventEmitter<string>();

	onEdit() {
		this.editClicked.emit('A new value');
	}
}