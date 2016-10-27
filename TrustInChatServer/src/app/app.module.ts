import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageComponent } from './chat/message/message.component';
import { MessageListComponent } from './chat/message/message-list.component';
import { MessageInputComponent } from './chat/message/message-input.component';  
import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header.component';

import { routing } from './app.routing';

@NgModule({
	declarations: [
		AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent,
		ChatComponent,
		HomepageComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	bootstrap: [AppComponent]
})
export class AppModule {

}