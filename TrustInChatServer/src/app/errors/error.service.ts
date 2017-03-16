import {EventEmitter} from '@angular/core';
import {Error} from './error.model';

export class ErrorService {

	errorOcurred = new EventEmitter<Error>();

	handleError(error: any) {
		if (error.title == 'Session Closed') {
			sessionStorage.setItem('session', 'closed');
		} else if (error.title == 'Message is permanently deleted.') {
			sessionStorage.setItem('session', 'redirect');
		} else {
			const errorData = new Error(error.title, error.error.message);
			this.errorOcurred.emit(errorData);

			if (errorData.title == '0') {
				sessionStorage.setItem('attempt', '0');
			}

			if (errorData.title == '3 attempts remaining') {
				let counter = 20;
				let interval = setInterval(function() {
					counter--;
					sessionStorage.setItem('countdown', String(counter));
					if (counter == 0) {
						clearInterval(interval);
					}
				}, 1000);
				sessionStorage.setItem('delay', '0');
				setTimeout(() => {
					sessionStorage.setItem('delay', '20');
				}, 20000);
			}
		}
	}
}
