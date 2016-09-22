import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './user';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

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
			.catch(error => Observable.throw(error.json().error || 'error'));

	}

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}

	//quitChat() {
	//	localStorage.clear();
	//}
}