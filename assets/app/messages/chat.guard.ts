import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ChatGuard implements CanActivate {

	constructor(private _router: Router) {
		
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (localStorage.getItem('token') !== null && 
			localStorage.getItem('server_session_id') !== null && 
			localStorage.getItem('client_session_secret') !== null) {
			return true;	
		}
		
		else {
			this._router.navigate(['']);
			return false;
		}
	}
}