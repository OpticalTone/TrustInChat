import {Component, OnInit} from "@angular/core";
import {Message} from "./message";
import {MessageService} from "./message.service";
import {ErrorService} from '../errors/error.service';
import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-message-input',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<div class="form-group">
				<div class="input-group">
					<input type="text" class="form-control" id="content" #input [ngModel]="message?.content" placeholder="Enter text here...">
					<span class="input-group-btn">
						<button type="submit" class="btn btn-primary" (click)="onSubmit(input.value)">{{ !message ? 'SEND' : 'SAVE' }}</button>
					</span>
				</div>
			</div>
			<button type="button" class="btn btn-danger" (click)="onCancel()" *ngIf="message">Cancel</button>
		</section>
	`,
	styles: [`
		button {
			float: right;
		}
	`]
})
export class MessageInputComponent implements OnInit{
	message: Message = null;

	constructor(private _messageService: MessageService, private _errorService: ErrorService) {}

	onSubmit(content: string) {
		if (this.message) {
			// edit
			this.message.content = content;
			this._messageService.updateMessage(this.message)
				.subscribe(
					data => console.log(data),
					error => this._errorService.handleError(error)
				);
			this.message = null;
		} else {

			if (!content){
				content = '(empty message)';
			}

			const message: Message = new Message(content, null, null);
			this._messageService.addMessage(message)
				.subscribe(
					data => {
						console.log(data);
						this._messageService.messages.push(data);
					},
					error => this._errorService.handleError(error)
				);
		}

	this.createNewChatSessionOnSubmit();	
		
	}

	onCancel() {
		this.message = null;
	}

	ngOnInit() {
		this._messageService.messageIsEdit.subscribe(
			message => {
				this.message = message;
			}
		);

		this.createNewChatSessionOnInit();
	}

	private createNewChatSessionOnInit() {

		var server_session_id = localStorage.getItem('server_session_id');
		var server_session_id_validation = localStorage.getItem('server_session_id_validation');
		var server_session_salt = localStorage.getItem('server_session_salt');
		var server_session_secret = localStorage.getItem('server_session_secret');
		var answer_proof = localStorage.getItem('answer_proof');

		// The question (encrypted) + question salt + validation: 
		var randomQuestionString = this.generateRandomString(8);
		var questionArray = CryptoJS.enc.Utf16.parse(randomQuestionString);
		var question_salt = CryptoJS.enc.Base64.stringify(questionArray);

		var plain_text_question = localStorage.getItem('question');
		var client_session_secret = localStorage.getItem('client_session_secret');

		var question_secret_string = "secret:" + question_salt + ":" + client_session_secret;
		var hash_question_secret = CryptoJS.SHA256(question_secret_string);
		var question_secret = CryptoJS.enc.Base64.stringify(hash_question_secret);

		var encrypted_question = CryptoJS.AES.encrypt(question_secret, plain_text_question);

		var question_secret_validation_string = "validate:" + question_salt + ":" + client_session_secret;
		var hash_validation = CryptoJS.SHA256(question_secret_validation_string);
		var question_secret_validation = CryptoJS.enc.Base64.stringify(hash_validation);

		var question_integrity_arr = CryptoJS.HmacSHA256(question_secret, plain_text_question);
		var question_integrity = CryptoJS.enc.Base64.stringify(question_integrity_arr);

		console.log('-----------------------------------------------');
		console.log('question_salt: ', question_salt);
		console.log('plain_text_question: ', plain_text_question);
		console.log('question_secret_string: ', question_secret_string);
		console.log('question_secret: ', question_secret);
		console.log('encrypted_question: ', encrypted_question);
		console.log('question_secret_validation_string: ', question_secret_validation_string);
		console.log('question_secret_validation: ', question_secret_validation);
		console.log('question_integrity: ', question_integrity);
		console.log('-----------------------------------------------');

	}

	private createNewChatSessionOnSubmit() {
		//The message (encrypted) + message salt + validation:
		var randomMessageString = this.generateRandomString(8);
		var messageArray = CryptoJS.enc.Utf16.parse(randomMessageString);
		var message_salt = CryptoJS.enc.Base64.stringify(messageArray);

		var shared_secret = localStorage.getItem('shared_secret');

		var message_secret_string = "secret:" + message_salt + ":" + shared_secret;
		var hash_message_secret = CryptoJS.SHA256(message_secret_string);
		var message_secret = CryptoJS.enc.Base64.stringify(hash_message_secret);

		var message_secret_validation_string = "validate:" + message_salt + ":" + shared_secret;
		var hash_message_validation = CryptoJS.SHA256(message_secret_validation_string);
		var message_secret_validation = CryptoJS.enc.Base64.stringify(hash_message_validation);

		var plain_text_message = localStorage.getItem('initialMessage');

		var message_integrity_arr = CryptoJS.HmacSHA256(message_secret, plain_text_message);
		var message_integrity = CryptoJS.enc.Base64.stringify(message_integrity_arr);

		console.log('-----------------------------------------------');
		console.log('message_salt: ', message_salt);
		console.log('message_secret_string: ', message_secret_string);
		console.log('message_secret: ', message_secret);
		console.log('message_secret_validation_string: ', message_secret_validation_string);
		console.log('message_secret_validation: ', message_secret_validation);
		console.log('message_integrity: ', message_integrity);
		console.log('-----------------------------------------------');
	}

	private generateRandomString(len) {
		var text = " ";
		var characters = "abcdefghijklmnopqrstuvwxyz0123456789";

		for(var i = 0; i < len; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	}
}