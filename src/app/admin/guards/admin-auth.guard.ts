import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private UserService: UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this._AuthService.user
      .pipe(switchMap(user => this.UserService.get(user.uid).valueChanges()))
      .pipe(map(appUser => appUser.isAdmin));

      

  }

}
