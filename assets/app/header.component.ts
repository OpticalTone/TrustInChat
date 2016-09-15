import {Component} from '@angular/core';

@Component({
	selector: 'chat-header',
	template: `
		<header class="row">
			<nav class="col-md-8 col-md-offset-2">
				<ul class="nav nav-pills">
					<li><a href="/">Homepage</a></li>
					<li><a href="/chat">Chat</a></li>
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
	`]
})
export class HeaderComponent {

}