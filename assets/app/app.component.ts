import {Component} from '@angular/core';
import {HeaderComponent} from './header.component';
import {ErrorComponent} from './errors/error.component';

@Component({
	selector: 'my-app',
	template: `
		<div class="container">
			<chat-header></chat-header>
			<router-outlet></router-outlet>
		</div>
		<chat-error></chat-error>
	`,
	directives: [HeaderComponent, ErrorComponent]
})

export class AppComponent {

}