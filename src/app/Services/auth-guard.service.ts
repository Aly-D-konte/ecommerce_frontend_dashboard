import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentification/auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate  {

  constructor( private authservice :AuthService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authservice.isAuthenticated()) {
      this.router.navigate(['/connexion']);
      return false;
    }
    return  true;
    //  this.router.navigate(['/sidebar/dashboard']);
  }
  
}
