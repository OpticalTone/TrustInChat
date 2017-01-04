import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HomepageService } from './homepage.service';
import { ErrorService } from '../errors/error.service';

import { Session } from './session.model';
import { Email } from './email.model';

import * as CryptoJS from 'crypto-js';
import * as io from 'socket.io-client';

@Component({
	selector: 'chat-homepage',
	templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

	homepageForm: FormGroup;

	constructor(private homepageService: HomepageService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit() {
		
		let serverSecretId = sessionStorage.getItem('serverSecretId');
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		let serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		let serverSessionSecret = sessionStorage.getItem('serverSessionSecret');

		// generate cryptographic clientSessionSecret random string
		let randomString = this.generateRandomString(8);
		let secretArray = CryptoJS.enc.Utf16.parse(randomString); 
		let clientSessionSecret = CryptoJS.enc.Base64.stringify(secretArray);
		sessionStorage.setItem('clientSessionSecret', clientSessionSecret);

		let securityAnswer = this.homepageForm.value.securityAnswer;
		let answer = this.normalizeAnswer(securityAnswer);

		this.generateAnswerProof(answer);

		let answerProof = sessionStorage.getItem('answerProof');

		this.generateSharedSecret(answer);


		// The question (encrypted) + question salt + validation: 
		let randomQuestionString = this.generateRandomString(8);
		let questionArray = CryptoJS.enc.Utf16.parse(randomQuestionString);
		let questionSalt = CryptoJS.enc.Base64.stringify(questionArray);

		let plainTextQuestion = this.homepageForm.value.securityQuestion;

		let questionSecretString = "secret:" + questionSalt + ":" + clientSessionSecret;
		let hashQuestionSecret = CryptoJS.SHA256(questionSecretString);
		let questionSecret = CryptoJS.enc.Base64.stringify(hashQuestionSecret);

		let encryptedQuestionObject = CryptoJS.AES.encrypt(plainTextQuestion, questionSecret);
		let encryptedQuestion = encryptedQuestionObject.toString();

		let questionSecretValidationString = "validate:" + questionSalt + ":" + clientSessionSecret;
		let questionValidationHash = CryptoJS.SHA256(questionSecretValidationString);
		let questionSecretValidation = CryptoJS.enc.Base64.stringify(questionValidationHash);

		let questionIntegrityArr = CryptoJS.HmacSHA256(questionSecret, plainTextQuestion);
		let questionIntegrity = CryptoJS.enc.Base64.stringify(questionIntegrityArr);


		//The message (encrypted) + message salt + validation:
		let randomMessageString = this.generateRandomString(8);
		let messageArray = CryptoJS.enc.Utf16.parse(randomMessageString);
		let messageSalt = CryptoJS.enc.Base64.stringify(messageArray);

		let plainTextMessage = this.homepageForm.value.initialMessage;

		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let messageSecretString = "secret:" + messageSalt + ":" + sharedSecret;
		let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
		let messageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

		let encryptedInitialMessageObject = CryptoJS.AES.encrypt(plainTextMessage, messageSecret);
		let encryptedInitialMessage = encryptedInitialMessageObject.toString();

		let messageSecretValidationString = "validate:" + messageSalt + ":" + sharedSecret;
		let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
		let messageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

		let messageIntegrityArray = CryptoJS.HmacSHA256(messageSecret, plainTextMessage);
		let messageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);


		const session = new Session(
				this.homepageForm.value.toEmail,
				this.homepageForm.value.fromName,
				this.homepageForm.value.fromEmail,
				null,
				answerProof,
				encryptedInitialMessage,
				this.homepageForm.value.notifications,
				sessionStorage.getItem('user'),
				serverSessionId,
				serverSessionIdValidation,
				serverSessionSalt,
				serverSessionSecret,
				messageSalt,
				messageSecretValidation,
				messageIntegrity,
				questionSalt,
				encryptedQuestion,
				questionSecretValidation,
				questionIntegrity
			);

		this.homepageService.createSession(session)
			.subscribe(
				data => {
					
					this.router.navigate(['chat', serverSessionId], {fragment: clientSessionSecret});
				},
				error =>this.errorService.handleError(error)
			);

		// send email
		let toEmail = this.homepageForm.value.toEmail;
		let fromEmail = this.homepageForm.value.fromEmail;
		let fromName = 	this.homepageForm.value.fromName;
		let chatUrl = 'http://localhost:3000/chat/remotewelcome/';

		setTimeout(() => {
			let emailServerNonce = sessionStorage.getItem('emailServerNonce');
			let emailServerSecretProof = sessionStorage.getItem('emailServerSecretProof');
			let emailServerSecretExpiry = sessionStorage.getItem('emailServerSecretExpiry');

			const email = new Email(serverSessionId, clientSessionSecret, toEmail, fromEmail, fromName, 
									emailServerNonce, emailServerSecretProof, emailServerSecretExpiry, chatUrl);

			this.homepageService.sendEmail(email)
				.subscribe(
					data => {
						//console.log(data);
					},
					error => this.errorService.handleError(error)
				);
		}, 5000);
		
		// clear homepage form	
		this.homepageForm.reset();	
	}

	isLoggedIn() {
		return this.homepageService.isLoggedIn();
	}

	ngOnInit() {

		var socket = io();
			socket.on('connect', function() {
		    	console.log('connected!');
		});

		if (sessionStorage.getItem('serverSecretId') == null) {
			window.location.reload(true);
		}
		sessionStorage.removeItem('attempt');
		sessionStorage.setItem('user', 'homepage');

		let emailRegExp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
		let answerRegExp = "^[a-zA-Z0-9-_@#$%^&*\s]{4,}$";

		this.homepageForm = new FormGroup({
			toEmail: new FormControl(null, Validators.pattern(emailRegExp)),
			fromName: new FormControl(null, Validators.required),
			fromEmail: new FormControl(null, Validators.pattern(emailRegExp)),
			securityQuestion: new FormControl(null, Validators.required),
			securityAnswer: new FormControl(null, [
				Validators.required,
				Validators.pattern(answerRegExp) 
			]),
			securityAnswerRep: new FormControl(null, [
				Validators.required, 
				Validators.pattern(answerRegExp),
				this.matchAnswers.bind(this)
			]),
			initialMessage: new FormControl(null, Validators.required),
			notifications: new FormControl(null)
		});

	}

	private matchAnswers(control: FormControl): {[s: string]: boolean} {
		if (!this.homepageForm) {
			return {answersNotMatch: true};
		}
		if (control.value != this.homepageForm.controls['securityAnswer'].value) {
			return {answersNotMatch: true};
		}
	}

	private normalizeAnswer(answerInput) {
		let answerTrim = answerInput.trim();
		let answerWhitespaceCollapse = answerTrim.replace(/\s\s+/g, ' ');
		let answerWhitespaceDash = answerWhitespaceCollapse.replace(/\s-\s/g, '-');
		let answerUpperCase = answerWhitespaceDash.toUpperCase();
		//var answerTrailingPunctuation = answerUpperCase.replace(/[?.!,;]?$/, '');

		let normaizedAnswer = answerUpperCase;

		return normaizedAnswer;
	}

	private generateAnswerProof(answer) {
		let serverSecretId = sessionStorage.getItem('serverSecretId');
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		let serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		let serverSessionSecret = sessionStorage.getItem('serverSessionSecret');
 
		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

		sessionStorage.setItem('clientSessionSecret', clientSessionSecret);

		let answerProofString = "answer:" + serverSecretId + ":" + serverSessionId + ":" + 
		serverSessionIdValidation + ":" + serverSessionSalt + ":" + serverSessionSecret + ":" + 
		clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(answerProofString);
		let answerProof = CryptoJS.enc.Base64.stringify(hash);

        sessionStorage.setItem('answerProof', answerProof);
	}

	private generateSharedSecret(answer) {
		let serverSecretId = sessionStorage.getItem('serverSecretId');
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		let serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		let serverSessionSecret = sessionStorage.getItem('serverSessionSecret');
		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');


		let sharedSecretString = "cipher:" + serverSecretId + ":" + serverSessionId + ":" + 
		serverSessionIdValidation + ":" + serverSessionSalt + ":" + serverSessionSecret + ":" + 
		clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(sharedSecretString);
		let sharedSecret = CryptoJS.enc.Base64.stringify(hash);

		sessionStorage.setItem('sharedSecret', sharedSecret);
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