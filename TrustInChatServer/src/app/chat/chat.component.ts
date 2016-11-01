import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';

import { ChatService } from './chat.service';
import { HomepageService } from '../homepage/homepage.service';

@Component({
	selector: 'chat-page',
	template: `
		<div class="container">
		    <div class="panel">
			    <div class="data">
			    	<div class="row spacing">
						<section class="col-md-8 col-md-offset-2">
							<label>To:</label>
							<span id="toEmail">{{getToEmail()}}</span>
						</section>
					</div>
			    	<div class="row spacing">
						<section class="col-md-8 col-md-offset-2">
							<label>From:</label>
							<span id="fromEmail">{{getFromName()}} ({{getFromEmail()}})</span>
						</section>
					</div>
			    	<div class="row spacing">
						<section class="col-md-8 col-md-offset-2">
							<div style="white-space:nowrap">
								<label>Share URL:</label>
								<a href="{{getShareUrl()}}">{{getShareUrl()}}</a>
							</div>	
						</section>
					</div>
				</div>	
				<div class="row spacing">
					<chat-message-list></chat-message-list>		
				</div>
				<div class="row spacing">
					<chat-message-input></chat-message-input>		
				</div>
				<div class="col-md-8 col-md-offset-2">
					<button class="btn btn-primary" (click)="onCloseSession()">CLOSE</button>
				</div>
			</div>
		</div>	
	`,
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

	constructor(private chatService: ChatService, private homepageService: HomepageService, private router: Router) {

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
		//var serverSessionId = localStorage.getItem('server_session_id');

		//var clientSessionSecret = localStorage.getItem('client_session_secret');

		//var shareUrl = 'http://localhost:3000/chat/' + serverSessionId + '/' + clientSessionSecret;

		//return shareUrl;
	}

	onCloseSession() {
		this.homepageService.closeSession();
		this.router.navigate(['/']);
	}

}