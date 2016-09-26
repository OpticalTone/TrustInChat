import {Component} from '@angular/core';
import {MessageListComponent} from './message-list.component';
import {MessageInputComponent} from './message-input.component';

@Component({
	selector: 'chat-messages',
	template: `
	<div class="container">
		<div class="panel data">
			<div class="row spacing">
				<section class="col-md-8 col-md-offset-2">
					<div class="form-group">
						<label>To:</label>
						<input type="text" name="to" value="{{getToEmail()}}"/>
						<br><br>
						<label>From:</label>
						<input type="text" name="from" value="{{getFromEmail()}}"/>
						<br><br>
						<label>Share URL:</label>
						<input type="text" name="shareUrl" />
						<br><br>
					</div>
				</section>
			</div>
		</div>
	    <div class="panel">
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
			width: 500px;
			margin-left: 110px;
			margin-top: 100px;
		}
		.data input {
			float: right;
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

}