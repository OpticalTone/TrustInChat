import {Component, OnInit} from "@angular/core";
import {Message} from "./message";
import {MessageService} from "./message.service";
import {ErrorService} from '../errors/error.service';

@Component({
	selector: 'chat-message-input',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<div class="form-group">
				<div class="input-group">
					<input type="text" class="form-control" id="content" #input [ngModel]="message?.content" placeholder="Enter text here...">
					<span class="input-group-btn">
						<button type="submit" class="btn btn-primary" (click)="onSubmit(input.value)">{{ !message ? 'SEND' : 'SAVE' }}</button>
					</span>
				</div>
			</div>
			<button type="button" class="btn btn-danger" (click)="onCancel()" *ngIf="message">Cancel</button>
		</section>
	`,
	styles: [`
		button {
			float: right;
		}
	`]
})
export class MessageInputComponent implements OnInit{
	message: Message = null;

	constructor(private _messageService: MessageService, private _errorService: ErrorService) {}

	onSubmit(content: string) {
		if (this.message) {
			// edit
			this.message.content = content;
			this._messageService.updateMessage(this.message)
				.subscribe(
					data => console.log(data),
					error => this._errorService.handleError(error)
				);
			this.message = null;
		} else {

			if (!content){
				content = '(empty message)';
			}

			const message: Message = new Message(content, null, null);
			this._messageService.addMessage(message)
				.subscribe(
					data => {
						console.log(data);
						this._messageService.messages.push(data);
					},
					error => this._errorService.handleError(error)
				);
		}
		
	}

	onCancel() {
		this.message = null;
	}

	ngOnInit() {
		this._messageService.messageIsEdit.subscribe(
			message => {
				this.message = message;
			}
		);
	}
}