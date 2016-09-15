import {Component} from "@angular/core";
import {MessageComponent} from './message.component';
import {Message} from './message';

@Component({
	selector: 'chat-message-list',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<chat-message *ngFor="let message of messages" [message]="message" (editClicked)="message.content = $event"></chat-message>
		</section>
	`,
	directives: [MessageComponent]
})
export class MessageListComponent {

	messages: Message[] = [
		new Message('A new message', null, '1'),
		new Message('Another message', null, '2')
	];

}