import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemoteWelcomeService } from './remotewelcome.service';
import { ErrorService } from '../errors/error.service';

import { Session } from '../homepage/session.model';

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

		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

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
					console.log(data.obj);
					sessionStorage.setItem('toEmail', data.obj.toEmail);
					sessionStorage.setItem('fromEmail', data.obj.fromEmail);
					sessionStorage.setItem('fromName', data.obj.fromName);
					sessionStorage.setItem('securityQuestion', data.obj.securityQuestion);
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
}
