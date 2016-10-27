import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { Message } from './message.model';

@Component({
	selector: 'chat-message-input',
	templateUrl: './message-input.component.html',
})
export class MessageInputComponent implements OnInit{
	
	constructor(private chatService: ChatService) {

	}

	onSubmit(form: NgForm) {

		const message = new Message(form.value.content, 'user@user.com');
		this.chatService.addMessage(message);
		form.resetForm();
	}

	ngOnInit() {}
}