import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';

import { HomepageService } from '../homepage/homepage.service';

@Component({
	selector: 'chat-page',
	templateUrl: './chat.component.html',
	styles: [`
		.data {
			margin-top: 60px;
			margin-bottom 60px;		
		}

		span#toEmail {
			margin-left: 54px;
		}

		span#fromEmail {
			margin-left: 36px;
		}
	`]
})
export class ChatComponent {

	constructor(private homepageService: HomepageService, private router: Router) {

	}

	getToEmail() {
		return sessionStorage.getItem('toEmail');
	}

	getFromEmail() {
		return sessionStorage.getItem('fromEmail');
	}

	getFromName() {
		return sessionStorage.getItem('fromName');
	}

	getShareUrl() {
		let serverSessionId = sessionStorage.getItem('server_session_id');

		let clientSessionSecret = sessionStorage.getItem('client_session_secret');

		let shareUrl = 'http://localhost:3000/chat/' + serverSessionId + '/' + clientSessionSecret;

		return shareUrl;
	}

	onCloseSession() {
		this.homepageService.closeSession();
		this.router.navigate(['/']);
	}

}