import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';

const CHAT_ROUTES: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'chat', component: ChatComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(CHAT_ROUTES);