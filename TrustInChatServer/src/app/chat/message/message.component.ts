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
		.chatarticle {
			background-color: #e0ffff;
		}
		.chatarticleRight {
			background-color: #ccffe6;
		}
		.chatlist {
			margin-left: 50px;
			margin-right: 50px;
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
				result => console.log(result),
				error => this.errorService.handleError(error)
			);
	}

	belongsToUser() {
		return sessionStorage.getItem('user') == this.message.user;
	}

	remoteUser() {
		return sessionStorage.getItem('user') == 'remote';
	}
}