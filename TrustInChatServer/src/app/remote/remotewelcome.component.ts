import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemoteWelcomeService } from './remotewelcome.service';
import { ErrorService } from '../errors/error.service';

import { Session } from '../homepage/session.model';

import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'chat-remotewelcome',
	templateUrl: './remotewelcome.component.html',
	styles: [`
		.data {
			margin-top: 60px;
			margin-bottom 60px;		
		}

		span#toEmail {
			margin-left: 131px;
		}

		span#fromEmail {
			margin-left: 112px;
		}

		span#securityQuestion {
			margin-left: 30px;
		}
	`]
})
export class RemoteWelcomeComponent implements OnInit {
	
	session: Session;

	remotewelcomeForm: FormGroup

	private serverSecretId;
	private serverSessionId;
	private serverSessionIdValidation;
	private serverSessionSalt;
	private serverSessionSecret;
	private clientSessionSecret;

	private answerProof;

	private questionSecretValidation;

	constructor(private remoteWelcomeService: RemoteWelcomeService, private router: Router, private route: ActivatedRoute, private errorService: ErrorService) {

	}

	onSubmit() {
		if (sessionStorage.getItem('attempt') == '0') {
			sessionStorage.clear();
			this.router.navigate(['/']);
		}
		else {
			this.getSessionStorageData();

			let securityAnswer = this.remotewelcomeForm.value.securityAnswer;
			let answer = this.normalizeAnswer(securityAnswer);
			
			this.generateAnswerProof(answer);
			this.generateSharedSecret(answer);
			this.questionSecretValidation = sessionStorage.getItem('clientQuestionSecretValidation');

			this.remoteWelcomeService.signIn(this.answerProof, this.serverSessionId, this.questionSecretValidation)
				.subscribe(
					data => {
						sessionStorage.setItem('token', data.token);
						sessionStorage.setItem('toEmail', data.session.toEmail);
						sessionStorage.setItem('fromEmail', data.session.fromEmail);
						sessionStorage.setItem('initialMessage', data.session.initialMessage);
						this.router.navigate(['chat', this.serverSessionId], {fragment: this.clientSessionSecret});
					},
					error => this.errorService.handleError(error)
				);

			sessionStorage.setItem('user', 'remote');

			this.remotewelcomeForm.reset();
		}
	}

	ngOnInit() {
		this.serverSessionId = this.route.snapshot.params['serverSessionId'];
		this.clientSessionSecret = this.route.snapshot.fragment;

		sessionStorage.setItem('serverSessionId', this.serverSessionId);
		sessionStorage.setItem('clientSessionSecret', this.clientSessionSecret);

		this.remoteWelcomeService.getData()
			.subscribe(
				data => {
					//console.log(data);
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

	getCountdown(): string {
		return sessionStorage.getItem('countdown');
	}

	finishedCountdown(): boolean {
		return sessionStorage.getItem('countdown') == '0';
	}

	getDelay(): boolean {
		return sessionStorage.getItem('delay') == '0';
	}

	getToEmail(): string {
		return sessionStorage.getItem('toEmail');
	}

	getFromEmail(): string {
		return sessionStorage.getItem('fromEmail');
	}

	getFromName(): string {
		return sessionStorage.getItem('fromName');
	}

	getSecurityQuestion(): string {
		return sessionStorage.getItem('securityQuestion');
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
		this.getSessionStorageData();

		let answerProofString = "answer:" + this.serverSecretId + ":" + this.serverSessionId + ":" + 
		this.serverSessionIdValidation + ":" + this.serverSessionSalt + ":" + this.serverSessionSecret + ":" + 
		this.clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(answerProofString);
		this.answerProof = CryptoJS.enc.Base64.stringify(hash);
        sessionStorage.setItem('answerProof', this.answerProof);
	}

	private generateSharedSecret(answer): void {
		this.getSessionStorageData();

		let sharedSecretString = "cipher:" + this.serverSecretId + ":" + this.serverSessionId + ":" + 
		this.serverSessionIdValidation + ":" + this.serverSessionSalt + ":" + this.serverSessionSecret + ":" + 
		this.clientSessionSecret + ":" + answer + ":end";

		let hash = CryptoJS.SHA256(sharedSecretString);
		let sharedSecret = CryptoJS.enc.Base64.stringify(hash);
		sessionStorage.setItem('sharedSecret', sharedSecret);
	}

	private getSessionStorageData(): void {
		this.serverSecretId = sessionStorage.getItem('serverSecretId');
		this.serverSessionId = sessionStorage.getItem('serverSessionId');
		this.serverSessionIdValidation = sessionStorage.getItem('serverSessionIdValidation');
		this.serverSessionSalt = sessionStorage.getItem('serverSessionSalt');
		this.serverSessionSecret = sessionStorage.getItem('serverSessionSecret');
		this.clientSessionSecret = sessionStorage.getItem('clientSessionSecret');
	}
}
