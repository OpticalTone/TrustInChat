import {Component, OnInit} from "@angular/core";
import {MessageComponent} from './message.component';
import {MessageService} from './message.service';
import {Message} from './message';
import {ErrorService} from '../errors/error.service';

@Component({
	selector: 'chat-message-list',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<chat-message *ngFor="let message of messages" [message]="message" (editClicked)="message.content = $event"></chat-message>
		</section>
	`,
	directives: [MessageComponent]
})
export class MessageListComponent implements OnInit {

	constructor(private _messageService: MessageService, private _errorService: ErrorService) {}

	messages: Message[];

	ngOnInit() {
		this._messageService.getMessages()
			.subscribe(
				messages => {
					this.messages = messages;
					this._messageService.messages = messages;
				},
				error => this._errorService.handleError(error)
			);
	}
}