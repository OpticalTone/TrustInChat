import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HomepageService } from './homepage.service';
import { ErrorService } from '../errors/error.service';

import { User } from './user.model';
import { Email } from './email.model';

@Component({
	selector: 'chat-homepage',
	templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

	homepageForm: FormGroup;

	constructor(private homepageService: HomepageService) {

	}

	onSubmit() {
		
		const user = new User(
			this.homepageForm.value.fromName,
			this.homepageForm.value.initialMessage,
			null,
			this.homepageForm.value.toEmail,
			this.homepageForm.value.fromEmail,
			this.homepageForm.value.securityQuestion,
			this.homepageForm.value.notifications,
			//answer_proof,
			//question_salt,
			//encrypted_question,
			//question_secret,
			//question_secret_validation,
			//question_integrity
		);

		this.homepageService.addUser(user)
			.subscribe(
				data => console.log(data),
				error => console.log(error)
			);

		this.homepageForm.reset();
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
	
}