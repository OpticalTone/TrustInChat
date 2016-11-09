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
	
	user: User;

	remotewelcomeForm: FormGroup

	constructor(private remoteWelcomeService: RemoteWelcomeService, private router: Router, private route: ActivatedRoute) {

	}

	onSubmit() {

		let serverSessionId = sessionStorage.getItem('server_session_id');
		let clientSessionSecret = sessionStorage.getItem('client_session_secret');

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
			null,
			null,
			sessionStorage.getItem('server_session_id')
		);

		//const user = new User(this.remotewelcomeForm.value.securityAnswer);
		this.remoteWelcomeService.signin(user)
			.subscribe(
				data => {
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('userName', data.user.userName);
					sessionStorage.setItem('initialMessage', data.user.initialMessage);
					sessionStorage.setItem('securityAnswer', data.user.securityAnswer);
					sessionStorage.setItem('toEmail', data.user.toEmail);
					sessionStorage.setItem('fromEmail', data.user.fromEmail);
					sessionStorage.setItem('securityQuestion', data.user.securityQuestion);
					sessionStorage.setItem('notifications', data.user.notifications);
					sessionStorage.setItem('answer_proof', data.user.answer_proof);
					sessionStorage.setItem('shared_secret', data.user.shared_secret);
					sessionStorage.setItem('question_salt', data.user.question_salt);
					sessionStorage.setItem('question_secret', data.user.question_secret);
					sessionStorage.setItem('question_secret_validation', data.user.question_secret_validation);
					sessionStorage.setItem('question_integrity', data.user.question_integrity);
					//sessionStorage.setItem('server_secret_id', data.server_secret_id);
					//sessionStorage.setItem('server_session_id_validation', data.server_session_id_validation);
					//sessionStorage.setItem('server_session_salt', data.server_session_salt);
					//sessionStorage.setItem('server_session_secret', server_session_secret);
					console.log(data);
					this.router.navigate(['chat', serverSessionId, clientSessionSecret]);
				}
			);
		this.remotewelcomeForm.reset();
	}

	ngOnInit() {

		let serverSessionId = this.route.snapshot.params['serverSessionId'];
		let clientSessionSecret = this.route.snapshot.params['clientSessionSecret'];

		sessionStorage.setItem('server_session_id', serverSessionId);
		sessionStorage.setItem('client_session_secret', clientSessionSecret);

		//let answerRegExp = "^[a-zA-Z0-9-_@#$%^&*\s]{4,}$";

		this.remotewelcomeForm = new FormGroup({
			securityAnswer: new FormControl(null, [
				Validators.required
				//Validators.pattern(answerRegExp) 
			])
		});






		/*this.remoteWelcomeService.getUser()
			.subscribe(
				//data => console.log(data)
				//(user: User) => {
				//	this.user = user;
				//	console.log(this.user);
				//}
				data => console.log(data.obj.server_session_id)

			);

	}



	getToEmail() {
		
	}

	getFromEmail() {
		
	}

	getSecurityQuestion() {
		
	}*/

}
