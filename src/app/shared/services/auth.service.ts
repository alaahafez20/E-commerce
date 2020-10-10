import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { userInDatabase, UserService } from 'shared/services/user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private _AngularFireAuth: AngularFireAuth, private _Router: Router,private _ActivatedRoute: ActivatedRoute, private _UserService:UserService) {
    this.user = _AngularFireAuth.authState
  }

  login() {
    this._AngularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this._AngularFireAuth.auth.signOut().then( s => this._Router.navigate(['/']))
  }

  userfromDatabase(): Observable<userInDatabase>{
    return this.user
    .pipe(switchMap(user => this._UserService.get(user.uid).valueChanges()))
  }
}
