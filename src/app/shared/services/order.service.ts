import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _AngularFireDatabase: AngularFireDatabase) { }

  createOrder(order){
    return this._AngularFireDatabase.list('/orders/').push(order)
  }
  getOrders(){
    return this._AngularFireDatabase.list('/orders').snapshotChanges()
  }

}
