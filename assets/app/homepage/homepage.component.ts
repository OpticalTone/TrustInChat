import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from './user';
import {HomepageService} from './homepage.service';
import {Router} from '@angular/router';

@Component({
	selector: 'chat-homepage',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<form [formGroup]="homepageForm" (ngSubmit)="onSubmit()">
				<div class="form-group">
		            <label for="toEmail">To e-mail:<br>
		            (optional)</label>
		            <input type="text" formControlName="toEmail" id="toEmail" name="toEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromName">From name:</label>
		            <input type="text" formControlName="fromName" id="fromName" name="fromName" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromEmail">From e-mail:<br>
		            (optional)</label>
		            <input type="text" formControlName="fromEmail" id="fromEmail" name="fromEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityQuestion">Security question:</label>
		            <select formControlName="securityQuestion" id="securityQuestion" name="securityQuestion">
		                <option>Where did we first meet?</option>
		            </select>
		        </div>
		        <div class="form-group">
		            <label for="securityAnswer">Security answer:<br>
		            (minimum 4 characters)</label>
		            <input type="password" formControlName="securityAnswer" id="securityAnswer" name="securityAnswer" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityAnswerRep">Security answer:<br>
		            (repeated)</label>
		            <input type="password" formControlName="securityAnswerRep" id="securityAnswerRep" name="securityAnswerRep" class="form-control">
		        </div>
		        <div class="form-group">
		        	<label for="content">Initial message:</label>
		            <textarea formControlName="content" id="content" name="content"></textarea>
		        </div>
		        <div class="form-group">
		            <input type="checkbox" formControlName="notifications" name="notifications" value="notifications">Please send me update notifications about the TrustInChat service.**                                      
		        </div>
		        <button type="submit" class="btn btn-primary" [disabled]="!homepageForm.valid">SUBMIT</button>
			</form>
		</section>
	`
})
export class HomepageComponent implements OnInit {
	
	homepageForm: FormGroup;

	constructor(private _fb: FormBuilder, private _homepageService: HomepageService, private _router: Router) {

	}

	onSubmit() {
		const user = new User(
			this.homepageForm.value.fromName,
			this.homepageForm.value.securityAnswer,
			this.homepageForm.value.toEmail,
			this.homepageForm.value.fromEmail,
			this.homepageForm.value.securityQuestion,
			this.homepageForm.value.notifications
			);

		this._homepageService.addUser(user)
			.subscribe(
				data => {
					console.log(user);
					console.log(data);
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					this._router.navigateByUrl('/chat');
				},
				error => console.error(error)
			);
	}

	isLoggedIn() {
		return this._homepageService.isLoggedIn();
	}

	//onQuitChat() {
	//	this._homepageService.quitChat()
	//	this._router.navigate(['/']);
	//}

	ngOnInit() {
		this.homepageForm = this._fb.group({
			toEmail: ['', Validators.compose([this.isEmail])],
			fromName: ['', Validators.required],
			fromEmail: ['', Validators.compose([this.isEmail])],
			securityQuestion: ['', Validators.required],
			securityAnswer: ['', Validators.compose([Validators.required, this.answerValidator])],
			securityAnswerRep: ['', Validators.compose([Validators.required, this.answerValidator])],
			content: ['', Validators.required],
			notifications: ['']
		});
	}

	private isEmail(control): {[s: string]: boolean} {
		if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			return {invalidEmail: true};
		}
	}

	private answerValidator(control): {[s: string]: boolean} {
		if (!control.value.match(/^[a-zA-Z0-9!@#$%^&*]{4,100}$/)) {
			return {invalidAnswer: true};
		}
	}
}