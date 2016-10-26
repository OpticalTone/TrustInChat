import { Component, OnInit } from '@angular/core';

import { ErrorService } from './error.service';

import { Error } from './error.model';


@Component({
	selector: 'chat-error',
	template: ``,
	styles: [``]
})
export class ErrorComponent implements OnInit {
	errorDisplay = 'none';
	errorData: Error;

	constructor (private _errorService: ErrorService) {

	}

	onErrorHandled() {
		this.errorDisplay = 'none';
	}

	ngOnInit() {
		this._errorService.errorOcurred.subscribe(
			errorData => {
				this.errorData = errorData;
				this.errorDisplay = 'block';
			}
		);
	}
}