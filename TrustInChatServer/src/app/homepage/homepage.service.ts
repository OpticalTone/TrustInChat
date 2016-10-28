import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from './user.model';
import { Email } from './email.model';

@Injectable()
export class HomepageService {

	private homepageUrl = 'http://localhost:3000';

	constructor(private http: Http) {

	}
	
	addUser(user: User) {

		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.homepageUrl, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
			
	}
}