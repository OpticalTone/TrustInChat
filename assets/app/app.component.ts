import {Component} from '@angular/core';
import {HeaderComponent} from './header.component';

@Component({
	selector: 'my-app',
	template: `
		<div class="container">
			<chat-header></chat-header>
		</div>
		<router-outlet></router-outlet>
	`
})

export class AppComponent {

}