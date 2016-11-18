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
		let messageSalt = CryptoJS.enc.Base64.stringify(messageArray);

		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let messageSecretString = "secret:" + messageSalt + ":" + sharedSecret;
		let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
		let messageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

		let messageSecretValidationString = "validate:" + messageSalt + ":" + sharedSecret;
		let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
		let messageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

		let plainTextMessage = form.value.content;

		let messageIntegrityArray = CryptoJS.HmacSHA256(messageSecret, plainTextMessage);
		let messageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);

		console.log('-----------------------------------------------');
		console.log('message-salt: ', messageSalt);
		console.log('message-secret-string: ', messageSecretString);
		console.log('message-secret: ', messageSecret);
		console.log('message-secret-validation-string: ', messageSecretValidationString);
		console.log('message-secret-validation: ', messageSecretValidation);
		console.log('message-integrity: ', messageIntegrity);
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
				messageSalt,
				messageSecret,
				messageSecretValidation,
				messageIntegrity,
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