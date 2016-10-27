import { Component } from '@angular/core';

import { ChatService } from './chat/chat.service';

import { HeaderComponent } from './header.component';
import { ErrorComponent } from './errors/error.component';



@Component({
	selector: 'chat-app',
	templateUrl: './app.component.html',
	providers: [ChatService]	
})
export class AppComponent {



}