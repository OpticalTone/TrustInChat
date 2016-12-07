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
			let randomMessageString = this.generateRandomString(8);
			let messageArray = CryptoJS.enc.Utf16.parse(randomMessageString);
			let newMessageSalt = CryptoJS.enc.Base64.stringify(messageArray);

			let plainTextMessage = form.value.content;

			let sharedSecret = sessionStorage.getItem('sharedSecret');

			let messageSecretString = "secret:" + newMessageSalt + ":" + sharedSecret;
			let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
			let newMessageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

			let encryptedNewMessageObject = CryptoJS.AES.encrypt(plainTextMessage, newMessageSecret);
			let encryptedNewMessage = encryptedNewMessageObject.toString();

			let messageSecretValidationString = "validate:" + newMessageSalt + ":" + sharedSecret;
			let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
			let newMessageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

			let messageIntegrityArray = CryptoJS.HmacSHA256(newMessageSecret, plainTextMessage);
			let newMessageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);

			console.log('-----------------------------------------------');
			console.log('new-message-salt: ', newMessageSalt);
			console.log('new-message-secret-string: ', messageSecretString);
			console.log('new-message-secret: ', newMessageSecret);
			console.log('new-plain-text-message: ', plainTextMessage);
			console.log('new-encrypted-message: ', encryptedNewMessage);
			console.log('new-message-secret-validation-string: ', messageSecretValidationString);
			console.log('new-message-secret-validation: ', newMessageSecretValidation);
			console.log('new-message-integrity: ', newMessageIntegrity);
			console.log('-----------------------------------------------');

			/*if (this.message) {
				// Edit
				// TODO: fix edit: take text from form, change it, encrypt it, save it, send it back to client, decrypt it, show message to user
				let editText = form.value.content;
				let sharedSecret = sessionStorage.getItem('sharedSecret');

				let encryptedEditMessageObject = CryptoJS.AES.encrypt(editText, newMessageSecret);
				let encryptedEditMessage = encryptedNewMessageObject.toString();

				this.message.encryptedMessage = encryptedEditMessage;
				this.message.newMessageSalt = newMessageSalt;
				this.message.newMessageSecretValidation = newMessageSecretValidation;
				this.message.newMessageIntegrity = newMessageIntegrity;
				this.chatService.updateMessage(this.message)
					.subscribe(
						result => console.log(result)
					);
				this.message = null;
			} else {*/
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
							console.log(data);
						},

						error => this.errorService.handleError(error)
					);
			//}
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

	private generateRandomString(len) {
		let text = " ";
		let characters = "abcdefghijklmnopqrstuvwxyz0123456789";

		for(let i = 0; i < len; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	}

}