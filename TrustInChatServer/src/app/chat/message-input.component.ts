import { Component, OnInit } from '@angular/core';

import { ChatService } from "./chat.service";
import { ErrorService } from "../errors/error.service";

import { Message } from "./message.model";

@Component({
	selector: 'chat-message-input',
	template: ``,
	styles: [``]
})
export class MessageInputComponent implements OnInit{
	
	ngOnInit() {}
}