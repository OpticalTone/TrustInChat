import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service'

import { Message } from './message/message.model';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class ChatService {

	private messages: Message[] = [];
	
	messageEdit = new EventEmitter<Message>();

	private chatUrl = 'http://localhost:3000/chatserver';

	constructor(private http: Http, private errorService: ErrorService) {

	}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.post(this.chatUrl + '/' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(
					result.obj.encryptedMessage,
					result.obj.session.fromEmail, 
					result.obj.session.toEmail, 
					result.obj._id, 
					result.obj.session._id,
					result.obj.messageSalt,
					result.obj.messageSecretValidation,
					result.obj.messageIntegrity,
					result.obj.user
				);


				let messageSalt = message.newMessageSalt;
				let sharedSecret = sessionStorage.getItem('sharedSecret');

				let messageSecretString = "secret:" + messageSalt + ":" + sharedSecret;
				let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
				let messageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

				let decryptedMessage = CryptoJS.AES.decrypt(message.encryptedMessage, messageSecret).toString(CryptoJS.enc.Utf8);
				
				console.log('messageSecretString: ' + messageSecretString);
				console.log('encryptedMessage: ' + message.encryptedMessage);
				console.log('messageSecret: ' + messageSecret);
				console.log('decryptedMessage: ' + decryptedMessage);

				message.encryptedMessage = decryptedMessage;

				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	getMessages() {
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let params = new URLSearchParams();
		params.set('serverSessionId', serverSessionId);
		
		return this.http.get(this.chatUrl, { search: params })
			.map((response: Response) => {

				const messages = response.json().obj;
				let transformedMessages: Message[] = [];

				for (let message of messages) {

					let m = new Message(
						message.encryptedMessage, 
						message.session.fromEmail, 
						message.session.toEmail, 
						message._id, 
						message.session._id,
						message.messageSalt, 
				 		message.messageSecretValidation, 
				 		message.messageIntegrity,
						message.user
					);

					transformedMessages.push(m);

				}

				let validatedMessages = [];

				for (let t of transformedMessages) {

					let messageSalt = t.newMessageSalt;
					let sharedSecret = sessionStorage.getItem('sharedSecret');

					let messageSecretString = "secret:" + messageSalt + ":" + sharedSecret;
					let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
					let messageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

					let decryptMessageObject = CryptoJS.AES.decrypt(t.encryptedMessage, messageSecret);
					let decryptedMessage = decryptMessageObject.toString(CryptoJS.enc.Utf8);
					console.log('encryptedMessage: ' + t.encryptedMessage);
					console.log('messageSecret: ' + messageSecret);
					console.log('decryptedMessage: ' + decryptedMessage);

					let messageValidation = t.newMessageSecretValidation;
					console.log('messageValidation: ' + messageValidation);

					let clientMessageValidationString = "validate:" + messageSalt + ":" + sharedSecret;
					let clientMessageValidationHash = CryptoJS.SHA256(clientMessageValidationString);
					let clientMessageValidation = CryptoJS.enc.Base64.stringify(clientMessageValidationHash);
					console.log('clientMessageValidation: ' + clientMessageValidation);

					let messageIntegrity = t.newMessageIntegrity;
					console.log('messageIntegrity: ' + messageIntegrity);

					let clientMessageIntegrityArray = CryptoJS.HmacSHA256(messageSecret, decryptedMessage);
					let clientMessageIntegrity = CryptoJS.enc.Base64.stringify(clientMessageIntegrityArray);
					console.log('clientMessageIntegrity: ' + clientMessageIntegrity);

					t.encryptedMessage = decryptedMessage;

					if (messageValidation == clientMessageValidation && messageIntegrity == clientMessageIntegrity) {
						validatedMessages.push(t);
					} 
				}

				//console.log(validatedMessages[0].encryptedMessage);

				this.messages = validatedMessages;
				return validatedMessages;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	editMessage(message: Message) {
		this.messageEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.patch(this.chatUrl + '/' + message.messageId + '/' + token, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.delete(this.chatUrl + '/' + message.messageId + '/' + token)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	closeSession(serverSessionId) {

		const token = sessionStorage.getItem('token') ? '?token=' + sessionStorage.getItem('token') : '';

		return this.http.delete(this.chatUrl + '/' + 'close/' + serverSessionId + '/' + token)
			.map(response => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
}
