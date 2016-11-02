import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';

import { ChatGuard } from './chat/chat.guard';

const CHAT_ROUTES: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'chat/:serverSessionId/:clientSessionSecret', component: ChatComponent, canActivate: [ChatGuard] },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(CHAT_ROUTES);