import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RemoteWelcomeService } from './remotewelcome.service';

import { User } from '../homepage/user.model';

@Component({
	selector: 'chat-remotewelcome',
	templateUrl: './remotewelcome.component.html'
})
export class RemoteWelcomeComponent implements OnInit {
	remotewelcomeForm: FormGroup

	constructor(private remoteWelcomeService: RemoteWelcomeService, private router: Router, private route: ActivatedRoute) {

	}

	onSubmit() {

		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

		const user = new User(
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			this.remotewelcomeForm.value.securityAnswer,
			null,
			//encrypted_question,
			null,
			null,
			null
		);

		//const user = new User(this.remotewelcomeForm.value.securityAnswer);
		this.remoteWelcomeService.signin(user)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('toEmail', data.toEmail);
					this.router.navigate(['chat', serverSessionId, clientSessionSecret]);
				}
			);
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

	getToEmail() {
		
	}

	getFromEmail() {
		
	}

	getSecurityQuestion() {
		
	}

}
