import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { User } from '../homepage/user.model';

@Injectable()
export class RemoteWelcomeService {

	private remoteWelcomeUrl = 'http://localhost:3000/remoteserver';

	constructor(private http: Http) {

	}

	signin(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.remoteWelcomeUrl, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	checkAnswer() {
		
	}

	getUser() {
		return this.http.get(this.remoteWelcomeUrl)
			.map((response: Response) => {
				const res = response.json().obj;
				let user = new User(
					res.server_session_id
					);
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}
}
