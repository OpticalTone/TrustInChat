import { Component } from '@angular/core';

import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';

@Component({
	selector: 'chat-page',
	template: `
		<div class="row">
			<chat-message-list></chat-message-list>		
		</div>
		<div class="row">
			<chat-message-input></chat-message-input>		
		</div>
	`
})
export class ChatComponent {

}