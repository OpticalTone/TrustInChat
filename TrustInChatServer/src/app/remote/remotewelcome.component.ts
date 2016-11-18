import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemoteWelcomeService } from './remotewelcome.service';
import { ErrorService } from '../errors/error.service';

import { Session } from '../homepage/session.model';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-remotewelcome',
	templateUrl: './remotewelcome.component.html'
})
export class RemoteWelcomeComponent implements OnInit {
	
	session: Session;

	remotewelcomeForm: FormGroup

	constructor(private remoteWelcomeService: RemoteWelcomeService, private router: Router, private route: ActivatedRoute, private errorService: ErrorService) {

	}

	onSubmit() {

		let serverSecretId = sessionStorage.getItem('serverSecretId');
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		let serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		let serverSessionSecret = sessionStorage.getItem('serverSessionSecret');

		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

		let securityAnswer = this.remotewelcomeForm.value.securityAnswer;
		let answer = this.normalizeAnswer(securityAnswer);

		this.generateSharedSecret(answer);

		const session = new Session(
			null,
			null,
			null,
			null,
			this.remotewelcomeForm.value.securityAnswer,
			null,
			null
		);

		this.remoteWelcomeService.signIn(session)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('toEmail', data.session.toEmail);
					sessionStorage.setItem('fromEmail', data.session.fromEmail);
					sessionStorage.setItem('initialMessage', data.session.initialMessage);
					console.log(data);
					this.router.navigate(['chat', serverSessionId, clientSessionSecret]);
				},
				error => this.errorService.handleError(error)
			);

		sessionStorage.setItem('user', 'remote');

		this.remotewelcomeForm.reset();
	}

	ngOnInit() {

		let serverSessionId = this.route.snapshot.params['serverSessionId'];
		let clientSessionSecret = this.route.snapshot.params['clientSessionSecret'];

		sessionStorage.setItem('serverSessionId', serverSessionId);
		sessionStorage.setItem('clientSessionSecret', clientSessionSecret);

		this.remoteWelcomeService.getData()
			.subscribe(
				data => {
					console.log(data);
					sessionStorage.setItem('serverSecretId', data.serverSecretId);
					sessionStorage.setItem('toEmail', data.toEmail);
					sessionStorage.setItem('fromName', data.fromName);
					sessionStorage.setItem('fromEmail', data.fromEmail);
					sessionStorage.setItem('securityQuestion', data.securityQuestion);
					sessionStorage.setItem('serverSessionId', data.serverSessionId);
					sessionStorage.setItem('serverSessionIdValidation', data.serverSessionIdValidation);
					sessionStorage.setItem('serverSessionSalt', data.serverSessionSalt);
					sessionStorage.setItem('serverSessionSecret', data.serverSessionSecret);
				},
				error => this.errorService.handleError(error)
			);	

		let answerRegExp = "^[a-zA-Z0-9-_@#$%^&*\s]{4,}$";

		this.remotewelcomeForm = new FormGroup({
			securityAnswer: new FormControl(null, [
				Validators.required,
				Validators.pattern(answerRegExp) 
			])
		});
	}

	getToEmail() {
		return sessionStorage.getItem('toEmail');
	}

	getFromEmail() {
		return sessionStorage.getItem('fromEmail');
	}

	getFromName() {
		return sessionStorage.getItem('fromName');
	}

	getSecurityQuestion() {
		return sessionStorage.getItem('securityQuestion');
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

		console.log('-----------------------------------------------');
		console.log('sharedSecretString: ' + sharedSecretString);
		console.log('shared-secret: ' + sharedSecret);
		console.log('-----------------------------------------------');
	}
}
