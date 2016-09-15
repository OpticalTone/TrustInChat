import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MessagesComponent} from './messages/messages.component';

const appRoutes: Routes = [
	{path: '', component: HomepageComponent},
	{path: 'chat', component: MessagesComponent }
]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);