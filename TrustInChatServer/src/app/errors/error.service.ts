import {EventEmitter} from '@angular/core';
import {Error} from './error.model';

export class ErrorService {

	errorOcurred = new EventEmitter<Error>();

	handleError(error: any) {
		const errorData = new Error(error.title, error.error.message);
		this.errorOcurred.emit(errorData);

		//console.log(errorData.title);

		if (errorData.title == '0') {
			sessionStorage.setItem('attempt', '0');
		}

		if (errorData.title == '3 attempts remaining') {
			let cc = 20;
			let interval = setInterval(function() {
				cc--;
				console.log(cc);
				sessionStorage.setItem('countdown', String(cc));
				if (cc == 0) {
					clearInterval(interval);
				}
			}, 1000);
			//console.log('0 sec');
			sessionStorage.setItem('delay', '0');
			setTimeout(()=>{
				//console.log('20 sec');
				sessionStorage.setItem('delay', '20');
			}, 20000);
		}
	}
}
