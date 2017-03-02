import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	
	constructor(private chatService: ChatService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit(form: NgForm) {

		if (sessionStorage.getItem('attempt') == '0') {
			sessionStorage.clear();
			this.router.navigate(['/']);
		}
		else {
			//The message (encrypted) + message salt + validation:
			let newMessageSalt = this.cryptoRandomString(16);
			let plainTextMessage = form.value.content;
			let sharedSecret = sessionStorage.getItem('sharedSecret');

			let messageSecretString = "secret:" + newMessageSalt + ":" + sharedSecret;
			let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
			let newMessageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

			let encryptedNewMessage = CryptoJS.AES.encrypt(plainTextMessage, newMessageSecret).toString();

			let messageSecretValidationString = "validate:" + newMessageSalt + ":" + sharedSecret;
			let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
			let newMessageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

			let messageIntegrityArray = CryptoJS.HmacSHA256(newMessageSecret, plainTextMessage);
			let newMessageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);

			if (this.message) {
				// Edit
				let editedMessageSalt = this.cryptoRandomString(16);
				let editText = form.value.content;
				let sharedSecret = sessionStorage.getItem('sharedSecret');

				let editedMessageSecretString = "secret:" + editedMessageSalt + ":" + sharedSecret;
				let editedMessageHash = CryptoJS.SHA256(editedMessageSecretString);
				let editedMessageSecret = CryptoJS.enc.Base64.stringify(editedMessageHash);

				let encryptedEditedMessage = CryptoJS.AES.encrypt(editText, editedMessageSecret).toString();

				let editedMessageSecretValidationString = "validate:" + editedMessageSalt + ":" + sharedSecret;
				let editedMessageValidationHash = CryptoJS.SHA256(editedMessageSecretValidationString);
				let editedMessageSecretVlidation = CryptoJS.enc.Base64.stringify(editedMessageValidationHash);

				let editedMessageIntegrityArray = CryptoJS.HmacSHA256(editedMessageSecret, editText);
				let editedMessageIntegrity = CryptoJS.enc.Base64.stringify(editedMessageIntegrityArray);


				this.message.encryptedMessage = encryptedEditedMessage;
				this.message.newMessageSalt = editedMessageSalt;
				this.message.newMessageSecretValidation = editedMessageSecretVlidation;
				this.message.newMessageIntegrity = editedMessageIntegrity;
				this.chatService.updateMessage(this.message)
					.subscribe(
						result => {
							//console.log(result);
						},
						error => this.errorService.handleError(error)
					);
				this.message = null;
			} else {

				// Create
				const message = new Message(
					encryptedNewMessage,
					null,
					null,
					null,
					null,
					newMessageSalt,
					newMessageSecretValidation,
					newMessageIntegrity,
					sessionStorage.getItem('user')
					);

				this.chatService.addMessage(message)
					.subscribe(
						data => {
							//console.log(data);
						},
						error => this.errorService.handleError(error)
					);
			}
			form.resetForm();
		}
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

	private cryptoRandomString(len): string {
		let text = '';
		let characters = "abcdefghijklmnopqrstuvwxyz0123456789";

		let values = new Uint32Array(len);
		window.crypto.getRandomValues(values);

		for(let i = 0; i < len; i++) {
			text += characters[values[i] % characters.length];
		}
		return text;
	}
}