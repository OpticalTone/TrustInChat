import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service'

import { Message } from './message/message.model';

import * as CryptoJS from 'crypto-js';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

	private messages: Message[] = [];
	
	messageEdit = new EventEmitter<Message>();

	private chatUrl = 'http://localhost:3000/chatserver';
	private socket: any;

	constructor(private http: Http, private errorService: ErrorService) {

	}

	addMessage(message: Message) {

		//this.socket.emit('add-message', message);

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
					result.obj.session.serverSessionId,
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

		/*let observable = new Observable((observer:any) => {
			this.socket = io(this.chatUrl);
			this.socket.on('message', (data:any) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			}
		});
		return observable;*/

		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let params = new URLSearchParams();
		params.set('serverSessionId', serverSessionId);

		return Observable
			.interval(1000)
			.switchMap(() => {
				return this.http.get(this.chatUrl, { search: params })
			})
			.map((response: Response) => {

				const messages = response.json().obj;
				let transformedMessages: Message[] = [];

				for (let message of messages) {

					let m = new Message(
						message.encryptedMessage, 
						message.session.fromEmail, 
						message.session.toEmail, 
						message._id, 
						message.session.serverSessionId,
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

					let messageValidation = t.newMessageSecretValidation;

					let clientMessageValidationString = "validate:" + messageSalt + ":" + sharedSecret;
					let clientMessageValidationHash = CryptoJS.SHA256(clientMessageValidationString);
					let clientMessageValidation = CryptoJS.enc.Base64.stringify(clientMessageValidationHash);

					let messageIntegrity = t.newMessageIntegrity;

					let clientMessageIntegrityArray = CryptoJS.HmacSHA256(messageSecret, decryptedMessage);
					let clientMessageIntegrity = CryptoJS.enc.Base64.stringify(clientMessageIntegrityArray);

					t.encryptedMessage = decryptedMessage;

					if (messageValidation == clientMessageValidation && messageIntegrity == clientMessageIntegrity) {
						validatedMessages.push(t);
					} 
				}
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
