import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Message} from './message';
//import {User} from '../homepage/user';


@Component({
	selector: 'chat-message',
	template: `
		<article class="panel panel-default">
			<div class="panel-body">
				{{message.content}}
			</div>
			<footer class="panel-footer">
				<div class="author">
					{{message.userId}}
				</div>
				<div class="config">
					<a href="#" (click)="onClick()">Edit</a>
					<a href="#">Delete</a>
				</div>
			</footer>		
		</article>
	`,
	styles: [`
		.author {
			display: inline-block;
			font-style: italic;
			font-size: 12px;
			width: 80%;
		}
		.config {
			display: inline-block;
			text-align: right;
			font-size: 12px;
			width: 19%
		}
	`]
})
export class MessageComponent {

	@Input() message:Message;

	@Output() editClicked = new EventEmitter<string>();

	onClick() {
		this.editClicked.emit('Changed');
	}

}