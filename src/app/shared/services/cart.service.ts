import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private _AngularFireDatabase: AngularFireDatabase) { }

  createUserCart(userUid,data){
    return this._AngularFireDatabase.list('/shopping-cart/' + userUid).push(data)
  }
  getCart(userUid){
    return this._AngularFireDatabase.list('/shopping-cart/' + userUid).snapshotChanges()
  }
  deleteCart(userUid,cartKey){
    return this._AngularFireDatabase.object('/shopping-cart/' + userUid +'/'+ cartKey).remove()
  }
  saveCart(userUid,cartKey,updatedQuantity){
    return this._AngularFireDatabase.object('/shopping-cart/' + userUid +'/'+ cartKey).update({
      quantity: updatedQuantity
    })
  }
  clearAll(userUid){
    return this._AngularFireDatabase.list('/shopping-cart/' + userUid).remove()
  }
  
  
}
