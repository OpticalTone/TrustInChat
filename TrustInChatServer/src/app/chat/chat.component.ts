import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';

import { ChatService } from './chat.service';
import { ErrorService } from '../errors/error.service';

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

	constructor(private chatService: ChatService, private errorService: ErrorService, private router: Router) {

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
		let serverSessionId = sessionStorage.getItem('serverSessionId');

		let clientSessionSecret = sessionStorage.getItem('clientSessionSecret');

		let shareUrl = 'https://localhost:3000/chat/remotewelcome/' + serverSessionId + '#' + clientSessionSecret;

		return shareUrl;
	}

	homepageUser() {
		return sessionStorage.getItem('user') == 'homepage';
	}

	onCloseSession() {

		let serverSessionId = sessionStorage.getItem('serverSessionId');
		
		this.chatService.closeSession(serverSessionId)
			.subscribe(
					result => {
						//console.log(result)
					},
					error => this.errorService.handleError(error)
				);

		sessionStorage.clear();

		this.router.navigate(['/']);
	}

}