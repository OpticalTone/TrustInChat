import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service';

import { Session } from './session.model';
import { Email } from './email.model';

@Injectable()
export class HomepageService {

	private homepageUrl = 'http://localhost:3000';
	private sendEmailUrl = 'http://localhost:2000';

	constructor(private http: Http, private errorService: ErrorService) {

	}
	
	createSession(session: Session) {
		const body = JSON.stringify(session);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post(this.homepageUrl, body, {headers: headers})
			.map((response: Response) => {
				const session= response.json();
				sessionStorage.setItem('token', session.token);
				sessionStorage.setItem('fromEmail', session.fromEmail);
				sessionStorage.setItem('fromName', session.fromName);
				sessionStorage.setItem('toEmail', session.toEmail);
				sessionStorage.setItem('encryptedInitialMessage', session.encryptedInitialMessage);
				sessionStorage.setItem('emailServerNonce', session.emailServerNonce);
				sessionStorage.setItem('emailServerSecretProof', session.emailServerSecretProof);
				sessionStorage.setItem('emailServerSecretExpiry', session.emailServerSecretExpiry);
			})
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
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	closeSession(serverSessionId) {
		return this.http.delete(this.homepageUrl + '/' + serverSessionId)
			.map(response => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	isLoggedIn() {
		return sessionStorage.getItem('token') !== null;
	}
}