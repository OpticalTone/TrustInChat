import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { MessageComponent } from './message.component';

import { Message } from './message.model';

import * as io from 'socket.io-client';

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
	connection: any;

	constructor(private chatService: ChatService, private errorService: ErrorService, private route: ActivatedRoute) {

	}

	ngOnInit() {

		if (!sessionStorage.getItem('serverSessionId')) {
			let serverSessionId = this.route.snapshot.params['serverSessionId'];
			sessionStorage.setItem('serverSessionId', serverSessionId);
		}
		
		var socket = io();
			socket.on('connect', function() {
		    	console.log('connected!');
		});

		//this.connection = this.chatService.getMessages()
		this.chatService.getMessages()
			.subscribe(
				(messages: Message[]) => {
					this.messages = messages;
				},
				error => this.errorService.handleError(error)
			);
	}
}