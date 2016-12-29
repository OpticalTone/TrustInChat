import { Component, Input } from '@angular/core';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { Message } from './message.model';

@Component({
	selector: 'chat-message',
	templateUrl: './message.component.html',
	styles: [`
		.author {
			font-style: italic;
			font-size: 12px;
			
		}
		.msg {
			display: inline-block;
			width: 80%;
		}
		.msgRight {
			display: inline-block;
			text-align: right;
			float: right;
		}
		.config {
			display: inline-block;
			text-align: right;
			font-size: 12px;
			width: 19%;
		}
		.colorHomepage {
			background-color: #e0ffff;
		}
		.colorRemote {
			background-color: #ccffe6;
		}
		.chatlist {
			margin-left: 70px;
			margin-right: 70px;
		}
	`]
})
export class MessageComponent {

	@Input() message: Message;

	constructor(private chatService: ChatService, private errorService: ErrorService) {

	}

	onEdit() {
		this.chatService.editMessage(this.message);
	}

	onDelete() {
		this.chatService.deleteMessage(this.message)
			.subscribe(
				result => {
					//console.log(result)
				},
				error => this.errorService.handleError(error)
			);
	}

	belongsToUser() {
		return sessionStorage.getItem('user') == this.message.user;
	}

	remoteUser() {
		return sessionStorage.getItem('user') == 'remote';
	}

	forColor() {
		return this.message.user == 'homepage';
	}
}