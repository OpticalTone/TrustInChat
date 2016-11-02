import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HomepageService } from './homepage.service';
import { ErrorService } from '../errors/error.service';

import { User } from './user.model';
import { Email } from './email.model';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-homepage',
	templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

	homepageForm: FormGroup;

	constructor(private homepageService: HomepageService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit() {

		sessionStorage.setItem('question', this.homepageForm.value.securityQuestion);

		let answer = this.homepageForm.value.securityAnswer;

		sessionStorage.setItem('answer', answer);

		let normalizedAnswer = this.normalizeAnswer(answer);

		this.generateAnswerProof(normalizedAnswer);	

		this.generateSharedSecret(normalizedAnswer);

		let answer_proof = sessionStorage.getItem('answer_proof');

		// The question (encrypted) + question salt + validation: 
		let randomQuestionString = this.generateRandomString(8);
		let questionArray = CryptoJS.enc.Utf16.parse(randomQuestionString);
		let question_salt = CryptoJS.enc.Base64.stringify(questionArray);

		let plain_text_question = sessionStorage.getItem('question');
		let client_session_secret = sessionStorage.getItem('client_session_secret');

		let question_secret_string = "secret:" + question_salt + ":" + client_session_secret;
		let hash_question_secret = CryptoJS.SHA256(question_secret_string);
		let question_secret = CryptoJS.enc.Base64.stringify(hash_question_secret);

		let encrypted_question = CryptoJS.AES.encrypt(question_secret, plain_text_question);

		let question_secret_validation_string = "validate:" + question_salt + ":" + client_session_secret;
		let hash_validation = CryptoJS.SHA256(question_secret_validation_string);
		let question_secret_validation = CryptoJS.enc.Base64.stringify(hash_validation);

		let question_integrity_arr = CryptoJS.HmacSHA256(question_secret, plain_text_question);
		let question_integrity = CryptoJS.enc.Base64.stringify(question_integrity_arr);

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

		
		const user = new User(
			this.homepageForm.value.fromName,
			this.homepageForm.value.initialMessage,
			null,
			this.homepageForm.value.toEmail,
			this.homepageForm.value.fromEmail,
			this.homepageForm.value.securityQuestion,
			this.homepageForm.value.notifications,
			answer_proof,
			question_salt,
			//encrypted_question,
			question_secret,
			question_secret_validation,
			question_integrity
		);

		let serverSessionId = sessionStorage.getItem('server_session_id');
		let clientSessionSecret = sessionStorage.getItem('client_session_secret');

		this.homepageService.addUser(user)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('initialMessage', data.initialMessage);
					sessionStorage.setItem('userId', data.userId);
					sessionStorage.setItem('toEmail', data.toEmail);
					sessionStorage.setItem('fromEmail', data.fromEmail);
					//this.router.navigate(['chat']);
					this.router.navigate(['chat', serverSessionId, clientSessionSecret]);
				},
				error =>this.errorService.handleError(error)
			);

		sessionStorage.setItem('fromName', this.homepageForm.value.fromName);

		

		const email = new Email(serverSessionId, clientSessionSecret);

		this.homepageService.sendEmail(email)
			.subscribe(
				data => {
					console.log(data);
				},
				error => this.errorService.handleError(error)
			);

		this.homepageForm.reset();	
	}

	isLoggedIn() {
		return this.homepageService.isLoggedIn();
	}

	ngOnInit() {

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
				Validators.pattern(answerRegExp)
			]),
			initialMessage: new FormControl(null, Validators.required),
			notifications: new FormControl(null)
		});

		//TODO: matchAnswer validation
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

	private generateAnswerProof(normalizedAnswer) {
		let server_secret_id = localStorage.getItem('server_secret_id');
		let server_session_id = localStorage.getItem('server_session_id');
		let server_session_id_validation = localStorage.getItem('server_session_id_validation');
		let server_session_salt = localStorage.getItem('server_session_salt');
		let server_session_secret = localStorage.getItem('server_session_secret');

		let randomString = this.generateRandomString(8);
		sessionStorage.setItem('randomString', randomString);
		let secretArray = CryptoJS.enc.Utf16.parse(randomString); 
		let client_session_secret = CryptoJS.enc.Base64.stringify(secretArray);

		sessionStorage.setItem('client_session_secret', client_session_secret);

		let answer_proof_string = "answer:" + server_secret_id + ":" + server_session_id + ":" + 
		server_session_id_validation + ":" + server_session_salt + ":" + server_session_secret + ":" + 
		client_session_secret + ":" + normalizedAnswer + ":end";

		let hash = CryptoJS.SHA256(answer_proof_string);
		let answer_proof = CryptoJS.enc.Base64.stringify(hash);

        sessionStorage.setItem('answer_proof', answer_proof);

        console.log('-----------------------------------------------');
        console.log('randomString: ' + randomString);
        console.log('client_session_secret: ' + client_session_secret);
        console.log('answer_proof_string: ' + answer_proof_string);
        console.log('answer_proof: ' + answer_proof);
        console.log('-----------------------------------------------');
	}

	private generateSharedSecret(normalizedAnswer) {
		let server_secret_id = localStorage.getItem('server_secret_id');
		let server_session_id = localStorage.getItem('server_session_id');
		let server_session_id_validation = localStorage.getItem('server_session_id_validation');
		let server_session_salt = localStorage.getItem('server_session_salt');
		let server_session_secret = localStorage.getItem('server_session_secret');
		let client_session_secret = localStorage.getItem('client_session_secret');

		let shared_secret_string = "cipher:" + server_secret_id + ":" + server_session_id + ":" + 
		server_session_id_validation + ":" + server_session_salt + ":" + server_session_secret + ":" + 
		client_session_secret + ":" + normalizedAnswer + ":end";

		let hash = CryptoJS.SHA256(shared_secret_string);
		let shared_secret = CryptoJS.enc.Base64.stringify(hash);

		sessionStorage.setItem('shared_secret', shared_secret);

		console.log('-----------------------------------------------');
		console.log('shared_secret_string: ' + shared_secret_string);
		console.log('shared_secret: ' + shared_secret);
		console.log('-----------------------------------------------');
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