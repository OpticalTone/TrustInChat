import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'chat-header',
	template: `
		<header class="row">
			<nav class="col-md-8 col-md-offset-2">
				<img border="0" alt="TrustInChat" src="TrustInChat_logo.png" width="100" height="100">
				<ul class="nav nav-pills">
					<li><a [routerLink]="['./']" routerLinkActive="active">Homepage</a></li>
					<li><a [routerLink]="['./chat']" routerLinkActive="active">Chat</a></li>
					<li><a href="#" routerLinkActive="active">About</a></li>
					<li><a href="#" routerLinkActive="active">Help</a></li>
				</ul>
			</nav>
		</header>
	`,
	styles: [`
		header {
			margin-bottom: 20px;
		}

		ul {
			text-align: center;
		}

		li {
			float: none;
			display: inline-block
		}

		a.active {
			color: #555;
			cursor: default;
			background-color: #fff;
		}
	`]
})
export class HeaderComponent {

}