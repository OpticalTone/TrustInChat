import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { Message } from './message.model';

@Component({
	selector: 'chat-message-input',
	templateUrl: './message-input.component.html',
})
export class MessageInputComponent implements OnInit {

	message: Message;
	
	constructor(private chatService: ChatService) {

	}

	onSubmit(form: NgForm) {
		if (this.message) {
			// Edit
			this.message.content = form.value.content;
			this.chatService.updateMessage(this.message)
				.subscribe(
					result => console.log(result)
				);
			this.message = null;
		} else {
			// Create
			const message = new Message(form.value.content);
			this.chatService.addMessage(message)
				.subscribe(
					data => console.log(data),
					error => console.error(error)
				);
		}
		form.resetForm();
	}

	onClear(form: NgForm) {
		this.message =null;
		form.resetForm();
	}

	ngOnInit() {
		this.chatService.messageEdit.subscribe(
			(message: Message) => this.message = message
		);
	}

}