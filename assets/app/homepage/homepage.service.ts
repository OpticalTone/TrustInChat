import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {Message} from '../messages/message';

@Injectable()
export class HomepageService {
	
	private homepageUrl = 'http://localhost:3000';

	constructor(private _http: Http) {

	}

	addUser(user: User) {

		const headers = new Headers({'Content-Type': 'application/json'});
		const body = JSON.stringify(user);

		return this._http.post(this.homepageUrl, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));

	}

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}

	//quitChat() {
	//	localStorage.clear();
	//}
	
	/*messages: Message[] = [];
	addInitialMessage(initialMessage: Message) {

		const headers = new Headers({'Content-Type': 'application/json'});
		const body = JSON.stringify(initialMessage);

		return this._http.post(this.homepageUrl, body, {headers: headers})
			.map(response => response.json())
			.catch(error => Observable.throw(error.json()));
			
	}*/
}