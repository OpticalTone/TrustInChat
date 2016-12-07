import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ChatGuard implements CanActivate {

	constructor(private router: Router) {
		
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

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