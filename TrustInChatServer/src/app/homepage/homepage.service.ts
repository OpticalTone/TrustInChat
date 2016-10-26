import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {User} from './user.model';
import {Email} from './email.model';
//import {Message} from '../messages/message';

@Injectable()
export class HomepageService {
	
	private homepageUrl = 'http://localhost:3000';
	private sendmailUrl = 'http://localhost:2000';

	constructor(private _http: Http) {

	}

	addUser(user: User) {

		const headers = new Headers({'Content-Type': 'application/json'});
		const body = JSON.stringify(user);

		return this._http.post(this.homepageUrl, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));

	}

	sendEmail(email: Email) {

		const headers = new Headers({'Content-Type': 'application/json'});
		const body = JSON.stringify(email);

		return this._http.post(this.sendmailUrl, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));

	}

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}
}