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

	private encryptedNewMessage: string;
	private newMessageSalt: string;
	private newMessageSecretValidation: string;
	private newMessageIntegrity: string;

	private encryptedEditedMessage: string;
	private editedMessageSalt: string;
	private editedMessageSecretValidation: string;
	private editedMessageIntegrity: string;
	
	constructor(private chatService: ChatService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit(form: NgForm) {
		if (sessionStorage.getItem('session') == 'closed') {
			sessionStorage.clear();
			this.router.navigate(['/']);
		}
		else {
			if (this.message) {
				// Update
				let editText = form.value.content;
				this.encryptEditedMessage(editText);

				this.updateMessage(this.message);
				
				
			} else {
				// Create
				let plainTextMessage = form.value.content;
				this.encryptNewMessage(plainTextMessage);

				this.createNewMessage();
				
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

	sessionClosed(): boolean {
		return sessionStorage.getItem('session') == 'closed';
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

	private encryptNewMessage(plainTextMessage): void {
		//The message (encrypted) + message salt + validation:
		this.newMessageSalt = this.cryptoRandomString(16);
		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let messageSecretString = "secret:" + this.newMessageSalt + ":" + sharedSecret;
		let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
		let newMessageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

		this.encryptedNewMessage = CryptoJS.AES.encrypt(plainTextMessage, newMessageSecret).toString();

		let messageSecretValidationString = "validate:" + this.newMessageSalt + ":" + sharedSecret;
		let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
		this.newMessageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

		let messageIntegrityArray = CryptoJS.HmacSHA256(newMessageSecret, plainTextMessage);
		this.newMessageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);
	}

	private encryptEditedMessage(editText): void {
		//The message (encrypted) + message salt + validation:
		this.editedMessageSalt = this.cryptoRandomString(16);
		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let editedMessageSecretString = "secret:" + this.editedMessageSalt + ":" + sharedSecret;
		let editedMessageHash = CryptoJS.SHA256(editedMessageSecretString);
		let editedMessageSecret = CryptoJS.enc.Base64.stringify(editedMessageHash);

		this.encryptedEditedMessage = CryptoJS.AES.encrypt(editText, editedMessageSecret).toString();

		let editedMessageSecretValidationString = "validate:" + this.editedMessageSalt + ":" + sharedSecret;
		let editedMessageValidationHash = CryptoJS.SHA256(editedMessageSecretValidationString);
		this.editedMessageSecretValidation = CryptoJS.enc.Base64.stringify(editedMessageValidationHash);

		let editedMessageIntegrityArray = CryptoJS.HmacSHA256(editedMessageSecret, editText);
		this.editedMessageIntegrity = CryptoJS.enc.Base64.stringify(editedMessageIntegrityArray);
	}

	private createNewMessage(): void {
		const message = new Message(
			this.encryptedNewMessage,
			null,
			null,
			null,
			null,
			this.newMessageSalt,
			this.newMessageSecretValidation,
			this.newMessageIntegrity,
			sessionStorage.getItem('user'));

		this.chatService.addMessage(message)
			.subscribe(
				data => {
					//console.log(data);
				},
				error => this.errorService.handleError(error)
			);
	}

	private updateMessage(message): void {
		this.message.encryptedMessage = this.encryptedEditedMessage;
		this.message.newMessageSalt = this.editedMessageSalt;
		this.message.newMessageSecretValidation = this.editedMessageSecretValidation;
		this.message.newMessageIntegrity = this.editedMessageIntegrity;

		this.chatService.updateMessage(this.message)
			.subscribe(
				result => {
					//console.log(result);
				},
				error => this.errorService.handleError(error)
			);
		this.message = null;
	}
}