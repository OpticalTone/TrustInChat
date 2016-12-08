import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { ErrorService } from '../errors/error.service';

import { Session } from '../homepage/session.model';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class RemoteWelcomeService {

	private session: Session;

	private remoteWelcomeUrl = 'http://localhost:3000/remoteserver';

	constructor(private http: Http, private errorService: ErrorService) {

	}

	getData() {
		let serverSessionId = sessionStorage.getItem('serverSessionId');
		let params = new URLSearchParams();
		params.set('serverSessionId', serverSessionId);

		return this.http.get(this.remoteWelcomeUrl, { search: params })
			.map((response: Response) => {
				const result = response.json();

				const serverSecretId = result.serverSecretId;

				const s = new Session(
					result.toEmail,
					result.fromName,
					result.fromEmail,
					result.securityQuestion,
					null,
					null,
					null,
					null,
					result.serverSessionId,
					result.serverSessionIdValidation,
					result.serverSessionSalt,
					result.serverSessionSecret,
					null,
					null,
					null,
					result.questionSalt,
					result.encryptedQuestion,
					result.questionSecretValidation,
					result.questionIntegrity
				);

				let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

				let questionSecretString = "secret:" + s.questionSalt + ":" + clientSessionSecret;
				let hashQuestionSecret = CryptoJS.SHA256(questionSecretString);
				let questionSecret = CryptoJS.enc.Base64.stringify(hashQuestionSecret);

				let decryptQuestionObject = CryptoJS.AES.decrypt(s.encryptedQuestion, questionSecret);
				let decryptedQuestion = decryptQuestionObject.toString(CryptoJS.enc.Utf8);

				let questionSecretValidationString = "validate:" + s.questionSalt + ":" + clientSessionSecret;
				let questionValidationHash = CryptoJS.SHA256(questionSecretValidationString);
				let clientQuestionSecretValidation = CryptoJS.enc.Base64.stringify(questionValidationHash);
				sessionStorage.setItem('clientQuestionSecretValidation', clientQuestionSecretValidation);

				let questionIntegrityArr = CryptoJS.HmacSHA256(questionSecret, s.securityQuestion);
				let clientQuestionIntegrity = CryptoJS.enc.Base64.stringify(questionIntegrityArr);

				console.log('decryptedQuestion: ' + decryptedQuestion);
				console.log('encrypted-question: ' + s.encryptedQuestion);
				console.log('question-secret-validation: ' + s.questionSecretValidation);
				console.log('clientQuestionSecretValidation: ' + clientQuestionSecretValidation);
				console.log('question-integrity: ' + s.questionIntegrity);
				console.log('clientQuestionIntegrity: ' + clientQuestionIntegrity);

				if (s.securityQuestion == decryptedQuestion && 
					s.questionSecretValidation == clientQuestionSecretValidation &&
					s.questionIntegrity == clientQuestionIntegrity) {
					sessionStorage.setItem('serverSecretId', serverSecretId);
					sessionStorage.setItem('toEmail', s.toEmail);
					sessionStorage.setItem('fromName', s.fromName);
					sessionStorage.setItem('fromEmail', s.fromEmail);
					sessionStorage.setItem('securityQuestion', s.securityQuestion);
					sessionStorage.setItem('serverSessionId', s.serverSessionId);
					sessionStorage.setItem('serverSessionIdValidation',s.serverSessionIdValidation);
					sessionStorage.setItem('serverSessionSalt', s.serverSessionSalt);
					sessionStorage.setItem('serverSessionSecret', s.serverSessionSecret);
				}


			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	signIn(session: Session) {
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
