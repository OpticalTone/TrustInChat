import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChatService } from '../chat.service';
import { ErrorService } from '../../errors/error.service';

import { Message } from './message.model';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-message-input',
	templateUrl: './message-input.component.html',
	styles: [`
		button {
			float: right;
		}
	`]
})
export class MessageInputComponent implements OnInit {

	message: Message;
	
	constructor(private chatService: ChatService, private errorService: ErrorService) {

	}

	onSubmit(form: NgForm) {

		//The message (encrypted) + message salt + validation:
		let randomMessageString = this.generateRandomString(8);
		let messageArray = CryptoJS.enc.Utf16.parse(randomMessageString);
		let message_salt = CryptoJS.enc.Base64.stringify(messageArray);

		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let message_secret_string = "secret:" + message_salt + ":" + sharedSecret;
		let hash_message_secret = CryptoJS.SHA256(message_secret_string);
		let message_secret = CryptoJS.enc.Base64.stringify(hash_message_secret);

		let message_secret_validation_string = "validate:" + message_salt + ":" + sharedSecret;
		let hash_message_validation = CryptoJS.SHA256(message_secret_validation_string);
		let message_secret_validation = CryptoJS.enc.Base64.stringify(hash_message_validation);

		let plain_text_message = sessionStorage.getItem('initialMessage');

		let message_integrity_arr = CryptoJS.HmacSHA256(message_secret, plain_text_message);
		let message_integrity = CryptoJS.enc.Base64.stringify(message_integrity_arr);

		console.log('-----------------------------------------------');
		console.log('message-salt: ', message_salt);
		console.log('message-secret-string: ', message_secret_string);
		console.log('message-secret: ', message_secret);
		console.log('message-secret-validation-string: ', message_secret_validation_string);
		console.log('message-secret-validation: ', message_secret_validation);
		console.log('message-integrity: ', message_integrity);
		console.log('-----------------------------------------------');

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
			const message = new Message(
				form.value.content,
				null,
				null,
				null,
				null,
				message_salt,
				message_secret,
				message_secret_validation,
				message_integrity,
				sessionStorage.getItem('user')
				);

			this.chatService.addMessage(message)
				.subscribe(
					data => console.log(data),
					error => this.errorService.handleError(error)
				);
		}
		form.resetForm();
	}

	onClear(form: NgForm) {
		this.message = null;
		form.resetForm();
	}

	ngOnInit() {
		this.chatService.messageEdit.subscribe(
			(message: Message) => this.message = message
		);
	}

	private generateRandomString(len) {
		let text = " ";
		let characters = "abcdefghijklmnopqrstuvwxyz0123456789";

		for(let i = 0; i < len; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	}

}