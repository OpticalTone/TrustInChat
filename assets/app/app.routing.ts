import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MessagesComponent} from './messages/messages.component';

const appRoutes: Routes = [
	{path: '', component: HomepageComponent},
	{path: 'chat', component: MessagesComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomepageComponent, MessagesComponent];