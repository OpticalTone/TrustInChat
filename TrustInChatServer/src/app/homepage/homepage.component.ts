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

	constructor(private homepageService: HomepageService, private errorService: ErrorService, private router: Router) {

	}

	onSubmit() {
		
		const session = new Session(
				this.homepageForm.value.toEmail,
				this.homepageForm.value.fromName,
				this.homepageForm.value.fromEmail,
				this.homepageForm.value.securityQuestion,
				this.homepageForm.value.securityAnswer,
				this.homepageForm.value.initialMessage,
				this.homepageForm.value.notifications,
				sessionStorage.getItem('user')
			);

		// get data from server(serverSessionId)
		this.homepageService.createSession(session)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('fromEmail', data.fromEmail);
					sessionStorage.setItem('fromName', data.fromName);
					sessionStorage.setItem('toEmail', data.toEmail);
					sessionStorage.setItem('initialMessage', data.initialMessage);
					sessionStorage.setItem('serverSessionId', data.session._id);
					this.router.navigate(['chat', 'session', clientSessionSecret]);
				},
				error =>this.errorService.handleError(error)
			);

		// generate cryptographic clientSessionSecret random string
		let randomString = this.generateRandomString(8);
		let secretArray = CryptoJS.enc.Utf16.parse(randomString); 
		let clientSessionSecret = CryptoJS.enc.Base64.stringify(secretArray);

		sessionStorage.setItem('clientSessionSecret', clientSessionSecret);

		// send email
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let toEmail = this.homepageForm.value.toEmail;
		let fromEmail = this.homepageForm.value.fromEmail;
		let fromName = 	this.homepageForm.value.fromName;

		const email = new Email(serverSessionId, clientSessionSecret, toEmail, fromEmail, fromName);

		this.homepageService.sendEmail(email)
			.subscribe(
				data => {
					console.log(data);
				},
				error => this.errorService.handleError(error)
			);

		// clear homepage form	
		this.homepageForm.reset();	
	}

	isLoggedIn() {
		return this.homepageService.isLoggedIn();
	}

	ngOnInit() {

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

	private generateAnswerProof(normalizedAnswer) {
		let server_secret_id = sessionStorage.getItem('server_secret_id');
		let server_session_id = sessionStorage.getItem('server_session_id');
		let server_session_id_validation = sessionStorage.getItem('server_session_id_validation');
		let server_session_salt = sessionStorage.getItem('server_session_salt');
		let server_session_secret = sessionStorage.getItem('server_session_secret');

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
		let server_secret_id = sessionStorage.getItem('server_secret_id');
		let server_session_id = sessionStorage.getItem('server_session_id');
		let server_session_id_validation = sessionStorage.getItem('server_session_id_validation');
		let server_session_salt = sessionStorage.getItem('server_session_salt');
		let server_session_secret = sessionStorage.getItem('server_session_secret');
		let client_session_secret = sessionStorage.getItem('client_session_secret');

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