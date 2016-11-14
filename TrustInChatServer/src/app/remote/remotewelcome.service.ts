import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service';

import { Session } from '../homepage/session.model';

@Injectable()
export class RemoteWelcomeService {

	private remoteWelcomeUrl = 'http://localhost:3000/remoteserver';

	constructor(private http: Http, private errorService: ErrorService) {

	}

	signin(session: Session) {
		const body = JSON.stringify(session);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.remoteWelcomeUrl, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

}
