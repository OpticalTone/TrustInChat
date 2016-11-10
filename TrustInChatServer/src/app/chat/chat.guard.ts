import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ChatGuard implements CanActivate {

	constructor(private router: Router) {
		
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		//var rnd_str_from_server = localStorage.getItem('rnd_str_from_server');

		//var input_server_client_rnd_str_from_email;

		//var rnd_str_plus_input = rnd_str_from_server + input_server_client_rnd_str_from_email;

		//var secretArrayRemote = CryptoJS.enc.Utf16.parse(rnd_str_plus_input);

		//var clientSessionSecretRemote = CryptoJS.enc.Base64.stringify(secretArrayRemote);

		// remote
		//if (route.params['clientSessionSecret'] === clientSessionSecretRemote) {
		//	return true;
		//}


		// local
		if (sessionStorage.getItem('token') !== null && 
		sessionStorage.getItem('serverSessionId') !== null && 
		sessionStorage.getItem('clientSessionSecret')  !== null) {
			return true;
		}

		else {
			this.router.navigate(['']);
		    return false;
		}	
	}
}