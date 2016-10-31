import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';

import { ChatService } from './chat.service';

@Component({
	selector: 'chat-page',
	template: `
		<div class="row">
			<chat-message-list></chat-message-list>		
		</div>
		<div class="row">
			<chat-message-input></chat-message-input>		
		</div>
		<div class="col-md-8 col-md-offset-2">
			<button class="btn btn-primary" (click)="onCloseSession()">CLOSE</button>
		</div>
	`
})
export class ChatComponent {

	constructor(private chatService: ChatService, private router: Router) {

	}

	onCloseSession() {
		this.chatService.closeSession();
		this.router.navigate(['/']);
	}

}