import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	selector: 'chat-header',
	template: `
		<header class="row">
			<nav class="col-md-8 col-md-offset-2 space">
				<ul class="nav nav-pills">
					<li><a [routerLink]="['/']" routerLinkActive="active">Homepage</a></li>
					<li><a [routerLink]="['/chat']" routerLinkActive="active">Chat</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Help</a></li>
				</ul>
			</nav>
		</header>
	`,
	styles: [``]
})
export class HeaderComponent {

}