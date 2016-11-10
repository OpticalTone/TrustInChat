import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { Session } from '../homepage/session.model';

@Injectable()
export class RemoteWelcomeService {

	private remoteWelcomeUrl = 'http://localhost:3000/remoteserver';

	constructor(private http: Http) {

	}

	signin(session: Session) {
		const body = JSON.stringify(session);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.remoteWelcomeUrl, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}
}
