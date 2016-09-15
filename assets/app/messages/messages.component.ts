import {Component} from '@angular/core';
import {MessageListComponent} from './message-list.component';
import {MessageInputComponent} from './message-input.component';

@Component({
	selector: 'chat-messages',
	template: `
		<div class="row spacing">
			<chat-message-input></chat-message-input>
		</div>
		<div class="row spacing">
			<chat-message-list></chat-message-list>
		</div>
	`,
	directives: [MessageListComponent, MessageInputComponent]
})
export class MessagesComponent {

}