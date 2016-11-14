import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemoteWelcomeService } from './remotewelcome.service';

import { Session } from '../homepage/session.model';

@Component({
	selector: 'chat-remotewelcome',
	templateUrl: './remotewelcome.component.html'
})
export class RemoteWelcomeComponent implements OnInit {
	
	session: Session;

	remotewelcomeForm: FormGroup

	constructor(private remoteWelcomeService: RemoteWelcomeService, private router: Router, private route: ActivatedRoute) {

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

		this.remoteWelcomeService.signin(session)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('toEmail', data.session.toEmail);
					sessionStorage.setItem('fromEmail', data.session.fromEmail);
					sessionStorage.setItem('initialMessage', data.session.initialMessage);
					console.log(data);
					this.router.navigate(['chat', serverSessionId, clientSessionSecret]);
				}
			);

		sessionStorage.setItem('user', 'remote');

		this.remotewelcomeForm.reset();
	}

	ngOnInit() {

		let serverSessionId = this.route.snapshot.params['serverSessionId'];
		let clientSessionSecret = this.route.snapshot.params['clientSessionSecret'];

		sessionStorage.setItem('serverSessionId', serverSessionId);
		sessionStorage.setItem('clientSessionSecret', clientSessionSecret);

		//let answerRegExp = "^[a-zA-Z0-9-_@#$%^&*\s]{4,}$";

		this.remotewelcomeForm = new FormGroup({
			securityAnswer: new FormControl(null, [
				Validators.required
				//Validators.pattern(answerRegExp) 
			])
		});
	}
}
