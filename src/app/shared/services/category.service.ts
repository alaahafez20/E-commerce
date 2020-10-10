import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _AngularFireDatabase: AngularFireDatabase) { }

  getCategories(){
    return this._AngularFireDatabase.list('/categories').snapshotChanges()
  }
}
