import {Component} from '@angular/core';
import {HeaderComponent} from './header.component';

@Component({
	selector: 'my-app',
	template: `
	<router-outlet></router-outlet>
		<div class="container">
			<chat-header></chat-header>
		</div>
	`
})

export class AppComponent {

}