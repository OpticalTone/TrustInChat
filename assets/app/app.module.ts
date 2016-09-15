import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent }   from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessageService } from './messages/message.service';

@NgModule({
	imports: [
    	BrowserModule,
    	FormsModule,
    	ReactiveFormsModule
  	],
    providers: [
        MessageService
    ],  
  	declarations: [
    	AppComponent,
    	MessageComponent,
    	MessageListComponent,
    	MessageInputComponent
    ],
    bootstrap:  [
	    [AppComponent]
    ]  
})
export class AppModule {}