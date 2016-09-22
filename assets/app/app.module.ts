import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { HeaderComponent } from './header.component';

import { HomepageComponent } from './homepage/homepage.component';

import { HomepageService } from './homepage/homepage.service';

import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';

import { MessageService } from './messages/message.service';

@NgModule({
	imports: [
    	BrowserModule,
    	FormsModule,
    	ReactiveFormsModule,
        HttpModule,
        AppRoutingModule
  	],
    declarations: [
        routingComponents,
        AppComponent,
        HeaderComponent,
        HomepageComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
    ],
    providers: [
        MessageService,
        HomepageService
    ],  
    bootstrap:  [
	    [AppComponent]
    ]  
})
export class AppModule {}