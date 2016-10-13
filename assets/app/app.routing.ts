import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MessagesComponent} from './messages/messages.component';
import {ChatGuard} from './messages/chat.guard';

const appRoutes: Routes = [
	{path: 'chat/:serverSessionId', component: MessagesComponent, canActivate: [ChatGuard]},
	{path: '', component: HomepageComponent},
	{path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomepageComponent, MessagesComponent];