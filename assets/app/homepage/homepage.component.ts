import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HomepageService} from './homepage.service';
import {Router} from '@angular/router';
import {ErrorService} from '../errors/error.service';

import {User} from './user';
import {Message} from '../messages/message';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-homepage',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<form [formGroup]="homepageForm" (ngSubmit)="onSubmit()">
				<div class="form-group">
		            <label for="toEmail">To e-mail:<br>
		            (optional)</label>
		            <input type="text" formControlName="toEmail" id="toEmail" name="toEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromName">From name:</label>
		            <input type="text" formControlName="fromName" id="fromName" name="fromName" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromEmail">From e-mail:<br>
		            (optional)</label>
		            <input type="text" formControlName="fromEmail" id="fromEmail" name="fromEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityQuestion">Security question:</label>
		            <select formControlName="securityQuestion" id="securityQuestion" name="securityQuestion">
		                <option>Where did we first meet?</option>
		            </select>
		        </div>
		        <div class="form-group">
		            <label for="securityAnswer">Security answer:<br>
		            (minimum 4 characters)</label>
		            <input type="password" formControlName="securityAnswer" id="securityAnswer" name="securityAnswer" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityAnswerRep">Security answer:<br>
		            (repeated)</label>
		            <input type="password" formControlName="securityAnswerRep" id="securityAnswerRep" name="securityAnswerRep" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="initialMessage">Initial Message:</label>
		            <input type="text" formControlName="initialMessage" id="initialMessage" name="initialMessage" class="form-control">
		        </div>
		        <div class="form-group">
		            <input type="checkbox" formControlName="notifications" name="notifications" value="notifications">Please send me update notifications about the TrustInChat service.**                                      
		        </div>
		        <button type="submit" class="btn btn-primary" [disabled]="!homepageForm.valid">SUBMIT</button>
			</form>
		</section>
	`
})
export class HomepageComponent implements OnInit {
	
	homepageForm: FormGroup;

	constructor(private _fb: FormBuilder, private _homepageService: HomepageService, private _router: Router, private _errorService: ErrorService) {
		
	}

	onSubmit() {
		const user = new User(
			this.homepageForm.value.fromName,
			this.homepageForm.value.initialMessage,
			//this.homepageForm.value.securityAnswer,
			null,
			this.homepageForm.value.toEmail,
			this.homepageForm.value.fromEmail,
			this.homepageForm.value.securityQuestion,
			this.homepageForm.value.notifications
			);

		localStorage.setItem('question', this.homepageForm.value.securityQuestion);

		this._homepageService.addUser(user)
			.subscribe(
				data => {
					console.log(user);
					console.log(data);
					localStorage.setItem('token', data.token);
					localStorage.setItem('initialMessage', data.initialMessage);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('toEmail', data.toEmail);
					localStorage.setItem('fromEmail', data.fromEmail);
					this._router.navigateByUrl('/chat');
				},
				error => this._errorService.handleError(error)
			);

		var answer = this.homepageForm.value.securityAnswer;

		localStorage.setItem('answer', answer);

		this.generateAnswerProof(answer);	

		this.generateSharedSecret();
	}

	isLoggedIn() {
		return this._homepageService.isLoggedIn();
	}

	//onQuitChat() {
	//	this._homepageService.quitChat()
	//	this._router.navigate(['/']);
	//}

	

	ngOnInit() {
		this.homepageForm = this._fb.group({
			toEmail: ['', Validators.compose([this.isEmail])],
			fromName: ['', Validators.required],
			fromEmail: ['', Validators.compose([this.isEmail])],
			securityQuestion: ['', Validators.required],
			securityAnswer: ['', Validators.compose([Validators.required, this.answerValidator])],
			securityAnswerRep: ['', Validators.compose([Validators.required, this.answerValidator])],
			initialMessage: ['', Validators.required],
			notifications: [''],
		}, {validator: this.matchAnswers('securityAnswer', 'securityAnswerRep')});
	}

	private isEmail(control): {[s: string]: boolean} {
		if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			return {invalidEmail: true};
		}
	}

	private answerValidator(control): {[s: string]: boolean} {
		if (!control.value.match(/^[a-zA-Z0-9!@#$%^&*]{4,100}$/)) {
			return {invalidAnswer: true};
		}
	}

	private matchAnswers(answerKey: string, answerRepKey: string) {
		return (group: FormGroup) => {
			let answerInput = group.controls[answerKey];
			let answerRepInput = group.controls[answerRepKey];
			if (answerInput.value !== answerRepInput.value) {
				return answerRepInput.setErrors({notEquivalent: true})
			}
		}
	}

	private normalizeAnswer(answerInput) {
		var answerTrim = answerInput.trim();
		var answerWhitespaceCollapse = answerTrim.replace(/\s\s+/g, ' ');
		var answerWhitespaceDash = answerWhitespaceCollapse.replace("[ ]-[ ]", "-");
		//var answerWhitespaceDash = answerWhitespaceCollapse.replace(" - ", "-");
		var answerUpperCase = answerWhitespaceDash.toUpperCase();
		var answerTrailingPunctuation = answerUpperCase.replace(/[?.!,;]?$/, '');

		var normaizedAnswer = answerTrailingPunctuation;
	}

	private generateAnswerProof(answer) {
		var server_secret_id = localStorage.getItem('server_secret_id');
		var server_session_id = localStorage.getItem('server_session_id');
		var server_session_id_validation = localStorage.getItem('server_session_id_validation');
		var server_session_salt = localStorage.getItem('server_session_salt');
		var server_session_secret = localStorage.getItem('server_session_secret');

		var randomString = this.generateRandomString(8);
		var secretArray = CryptoJS.enc.Utf16.parse(randomString); 
		var client_session_secret = CryptoJS.enc.Base64.stringify(secretArray);

		console.log('client_session_secret: ' + client_session_secret);

		localStorage.setItem('client_session_secret', client_session_secret);
		localStorage.setItem('answer', answer);

		var answer_proof_string = "answer:" + server_secret_id + ":" + server_session_id + ":" + 
		server_session_id_validation + ":" + server_session_salt + ":" + server_session_secret + ":" + 
		client_session_secret + ":" + answer + ":end";

		console.log('answer_proof_string: ' + answer_proof_string);

		var hash = CryptoJS.SHA256(answer_proof_string);
		var answer_proof = CryptoJS.enc.Base64.stringify(hash);

        console.log('answer_proof: ' + answer_proof);

		localStorage.setItem('answer_proof', answer_proof);
	}

	private generateSharedSecret() {
		var server_secret_id = localStorage.getItem('server_secret_id');
		var server_session_id = localStorage.getItem('server_session_id');
		var server_session_id_validation = localStorage.getItem('server_session_id_validation');
		var server_session_salt = localStorage.getItem('server_session_salt');
		var server_session_secret = localStorage.getItem('server_session_secret');
		var client_session_secret = localStorage.getItem('client_session_secret');
		var answer = localStorage.getItem('answer');

		var shared_secret_string = "cipher:" + server_secret_id + ":" + server_session_id + ":" + 
		server_session_id_validation + ":" + server_session_salt + ":" + server_session_secret + ":" + 
		client_session_secret + ":" + answer + ":end";

		console.log('shared_secret_string: ' + shared_secret_string);

		var hash = CryptoJS.SHA256(shared_secret_string);
		var shared_secret = CryptoJS.enc.Base64.stringify(hash);

		console.log('shared_secret: ' + shared_secret);

		localStorage.setItem('shared_secret', shared_secret);
	}

	private createNewChatSession() {

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

		var question_integrity = CryptoJS.HmacSHA256(question_secret, plain_text_question);

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

		var message_integrity = CryptoJS.HmacSHA256(message_secret, plain_text_message);
		
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