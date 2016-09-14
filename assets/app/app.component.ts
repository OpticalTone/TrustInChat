import {Component} from '@angular/core';
import {MessageComponent} from './messages/message.component';
import {Message} from './messages/message';
//import {User} from './homepage/user';

@Component({
	selector: 'my-app',
	template: `
		<div class="row">
			<section class="col-md-8 col-md-offset-2">
				<chat-message [message]="message" (editClicked)="message.content = $event"></chat-message>
			</section>
		</div>
	`,
	directives: [MessageComponent]
})
export class AppComponent {

	message: Message = new Message('A new message', null, '1');

}