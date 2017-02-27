import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HomepageService } from './homepage.service';
import { ErrorService } from '../errors/error.service';

import { Session } from './session.model';
import { Email } from './email.model';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-homepage',
	templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

	homepageForm: FormGroup;

	private serverSecretId: string;
	private serverSessionId: string;
	private serverSessionIdValidation: string;
	private serverSessionSalt: string;
	private serverSessionSecret: string;

	private clientSessionSecret: string;

	private answerProof: string;

	private questionSalt: string;
	private encryptedQuestion: string;
	private questionSecretValidation: string;
	private questionIntegrity: string;

	private encryptedInitialMessage: string;
	private messageSalt: string;
	private messageSecretValidation: string;
	private messageIntegrity: string;

	constructor(private homepageService: HomepageService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit() {
		// security model
		this.applySecurity();

		// create session
		const session = new Session(
				this.homepageForm.value.toEmail,
				this.homepageForm.value.fromName,
				this.homepageForm.value.fromEmail,
				null,
				this.answerProof,
				this.encryptedInitialMessage,
				this.homepageForm.value.notifications,
				sessionStorage.getItem('user'),
				this.serverSessionId,
				this.serverSessionIdValidation,
				this.serverSessionSalt,
				this.serverSessionSecret,
				this.messageSalt,
				this.messageSecretValidation,
				this.messageIntegrity,
				this.questionSalt,
				this.encryptedQuestion,
				this.questionSecretValidation,
				this.questionIntegrity
			);

		this.homepageService.createSession(session)
			.subscribe(
				data => {
					
					this.router.navigate(['chat', this.serverSessionId], {fragment: this.clientSessionSecret});
				},
				error =>this.errorService.handleError(error)
			);

		// send email
		this.sendEmail();	
		
		// clear homepage form	
		this.homepageForm.reset();	
	}

	isLoggedIn() {
		return this.homepageService.isLoggedIn();
	}

	ngOnInit() {
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

	private normalizeAnswer(answerInput): string {
		let answerTrim = answerInput.trim();
		let answerWhitespaceCollapse = answerTrim.replace(/\s\s+/g, ' ');
		let answerWhitespaceDash = answerWhitespaceCollapse.replace(/\s-\s/g, '-');
		let answerUpperCase = answerWhitespaceDash.toUpperCase();
		//var answerTrailingPunctuation = answerUpperCase.replace(/[?.!,;]?$/, '');

		let normaizedAnswer = answerUpperCase;

		return normaizedAnswer;
	}

	private generateAnswerProof(answer): void {
		let answerProofString = "answer:" + this.serverSecretId + ":" + this.serverSessionId + ":" + 
		this.serverSessionIdValidation + ":" + this.serverSessionSalt + ":" + this.serverSessionSecret + ":" + 
		this.clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(answerProofString);
		this.answerProof = CryptoJS.enc.Base64.stringify(hash);
	}

	private generateSharedSecret(answer): void {
		let sharedSecretString = "cipher:" + this.serverSecretId + ":" + this.serverSessionId + ":" + 
		this.serverSessionIdValidation + ":" + this.serverSessionSalt + ":" + this.serverSessionSecret + ":" + 
		this.clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(sharedSecretString);
		let sharedSecret = CryptoJS.enc.Base64.stringify(hash);

		sessionStorage.setItem('sharedSecret', sharedSecret);
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

	private encryptQuestion(): void {
		// The question (encrypted) + question salt + validation: 
		this.questionSalt = this.cryptoRandomString(16);
		let plainTextQuestion = this.homepageForm.value.securityQuestion;

		let questionSecretString = "secret:" + this.questionSalt + ":" + this.clientSessionSecret;
		let hashQuestionSecret = CryptoJS.SHA256(questionSecretString);
		let questionSecret = CryptoJS.enc.Base64.stringify(hashQuestionSecret);

		this.encryptedQuestion = CryptoJS.AES.encrypt(plainTextQuestion, questionSecret).toString();

		let questionSecretValidationString = "validate:" + this.questionSalt + ":" + this.clientSessionSecret;
		let questionValidationHash = CryptoJS.SHA256(questionSecretValidationString);
		this.questionSecretValidation = CryptoJS.enc.Base64.stringify(questionValidationHash);

		let questionIntegrityArr = CryptoJS.HmacSHA256(questionSecret, plainTextQuestion);
		this.questionIntegrity = CryptoJS.enc.Base64.stringify(questionIntegrityArr);
	}

	private encryptInitialMessage(): void {
		//The message (encrypted) + message salt + validation:
		this.messageSalt = this.cryptoRandomString(16);
		let plainTextMessage = this.homepageForm.value.initialMessage;
		let sharedSecret = sessionStorage.getItem('sharedSecret');

		let messageSecretString = "secret:" + this.messageSalt + ":" + sharedSecret;
		let hashMessageSecretString = CryptoJS.SHA256(messageSecretString);
		let messageSecret = CryptoJS.enc.Base64.stringify(hashMessageSecretString);

		this.encryptedInitialMessage = CryptoJS.AES.encrypt(plainTextMessage, messageSecret).toString();

		let messageSecretValidationString = "validate:" + this.messageSalt + ":" + sharedSecret;
		let hashMessageValidation = CryptoJS.SHA256(messageSecretValidationString);
		this.messageSecretValidation = CryptoJS.enc.Base64.stringify(hashMessageValidation);

		let messageIntegrityArray = CryptoJS.HmacSHA256(messageSecret, plainTextMessage);
		this.messageIntegrity = CryptoJS.enc.Base64.stringify(messageIntegrityArray);
	}

	private sendEmail(): void {
		let toEmail = this.homepageForm.value.toEmail;
		let fromEmail = this.homepageForm.value.fromEmail;
		let fromName = 	this.homepageForm.value.fromName;
		let chatUrl = 'https://localhost:3000/chat/remotewelcome/';

		setTimeout(() => {
			let emailServerNonce = sessionStorage.getItem('emailServerNonce');
			let emailServerSecretProof = sessionStorage.getItem('emailServerSecretProof');
			let emailServerSecretExpiry = sessionStorage.getItem('emailServerSecretExpiry');

			const email = new Email(this.serverSessionId, this.clientSessionSecret, toEmail, fromEmail, fromName, 
									emailServerNonce, emailServerSecretProof, emailServerSecretExpiry, chatUrl);

			this.homepageService.sendEmail(email)
				.subscribe(
					data => {
						//console.log(data);
					},
					error => this.errorService.handleError(error)
				);
		}, 5000);
	}

	private applySecurity(): void {
		// server data from browser sessionStorage
		this.serverSecretId = sessionStorage.getItem('serverSecretId');
		this.serverSessionId = sessionStorage.getItem('serverSessionId');
		this.serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		this.serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		this.serverSessionSecret = sessionStorage.getItem('serverSessionSecret');

		// generate cryptographic clientSessionSecret random string
		this.clientSessionSecret = this.cryptoRandomString(16);
		sessionStorage.setItem('clientSessionSecret', this.clientSessionSecret);

		let securityAnswer = this.homepageForm.value.securityAnswer;
		let answer = this.normalizeAnswer(securityAnswer);
		this.generateAnswerProof(answer);

		this.generateSharedSecret(answer);

		this.encryptQuestion();

		this.encryptInitialMessage();
	}
}