import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MessageComponent } from './chat/message/message.component';
import { MessageListComponent } from './chat/message/message-list.component';
import { MessageInputComponent } from './chat/message/message-input.component';  
import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header.component';
import { ErrorComponent } from './errors/error.component';

import { HomepageService } from './homepage/homepage.service';
import { ErrorService } from './errors/error.service';

import { ChatGuard } from './chat/chat.guard';

import { routing } from './app.routing';

@NgModule({
	declarations: [
		AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent,
		ChatComponent,
		HomepageComponent,
		HeaderComponent,
		ErrorComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		routing
	],
	providers: [
		HomepageService,
		ErrorService,
		ChatGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {

}