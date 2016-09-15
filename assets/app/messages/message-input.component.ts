import {Component} from "@angular/core";
import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
	selector: 'chat-message-input',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<div class="form-group">
				<label for="context">Content</label>
				<input type="text" class="form-control" id="content" #input>
			</div>
			<button type="submit" class="btn btn-primary" (click)="onSubmit(input.value)">Send Message</button>
		</section>
	`
})
export class MessageInputComponent {

	constructor(private _messageService: MessageService) {}

	onSubmit(content: string) {
		const message: Message = new Message(content, null, '1');
		this._messageService.addMessage(message);
	}
}