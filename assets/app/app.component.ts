import {Component} from '@angular/core';
import {MessageComponent} from './messages/message.component';
import {Message} from './messages/message';
//import {User} from './homepage/user';

@Component({
	//moduleId: module.id,
	selector: 'my-app',
	//templateUrl: 'app.component.html'
	template: `
		
		<div class="row">
			<section class="col-md-8 col-md-offset-2">
				<chat-message [message]="message"></chat-message>
			</section>
		</div>
	`,
	directives: [MessageComponent]
})
export class AppComponent {

	message: Message = new Message('A new message', null, '1');
	
}