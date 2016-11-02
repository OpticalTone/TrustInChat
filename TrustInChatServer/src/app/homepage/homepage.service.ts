import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service';

import { User } from './user.model';
import { Email } from './email.model';

@Injectable()
export class HomepageService {

	private homepageUrl = 'http://localhost:3000';
	private sendEmailUrl = 'http://localhost:2000';

	constructor(private http: Http, private errorService: ErrorService) {

	}
	
	addUser(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.homepageUrl, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	sendEmail(email: Email) {
		const headers = new Headers({'Content-Type': 'application/json'});
		const body = JSON.stringify(email);

		return this.http.post(this.sendEmailUrl, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));
	}

	closeSession() {
		sessionStorage.clear();
		//TODO: delete chat session on server, users and messages
	}

	isLoggedIn() {
		return sessionStorage.getItem('token') !== null;
	}
}