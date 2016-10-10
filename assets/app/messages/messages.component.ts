import {Component} from '@angular/core';
import {MessageListComponent} from './message-list.component';
import {MessageInputComponent} from './message-input.component';

import * as sioc from 'socket.io-client';

@Component({
	selector: 'chat-messages',
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
	`],
	directives: [MessageListComponent, MessageInputComponent]
})
export class MessagesComponent {

	getToEmail() {
		return localStorage.getItem('toEmail');
	}

	getFromEmail() {
		return localStorage.getItem('fromEmail');
	}

	getFromName() {
		return localStorage.getItem('fromName');
	}

	getShareUrl() {
		var serverSessionId = localStorage.getItem('server_session_id');

		var clientSessionSecret = localStorage.getItem('client_session_secret');

		var shareUrl = 'https://session.trustinchat.com/chat/' + serverSessionId + '#' + clientSessionSecret;

		return shareUrl;
	}

}