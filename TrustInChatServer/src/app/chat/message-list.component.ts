import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';
import { ErrorService } from '../errors/error.service';

import { MessageComponent } from './message.component';

import { Message } from './message.model';


@Component({
	selector: 'chat-message-list',
	template: ``
})
export class MessageListComponent implements OnInit {

	ngOnInit() {}
}