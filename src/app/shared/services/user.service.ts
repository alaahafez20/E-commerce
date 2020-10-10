import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export interface userInDatabase{
  name: string,
  email: string,
  isAdmin: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _AngularFireDatabase: AngularFireDatabase) { }

  save(user: firebase.User) {
    this._AngularFireDatabase.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid):AngularFireObject<userInDatabase> {
    return this._AngularFireDatabase.object('/users/' + uid)
  }


}

