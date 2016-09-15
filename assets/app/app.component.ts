import {Component} from '@angular/core';
import {MessageListComponent} from './messages/message-list.component';
import {MessageInputComponent} from './messages/message-input.component';

@Component({
	selector: 'my-app',
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
export class AppComponent {

	

}