import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _AngularFireDatabase: AngularFireDatabase) { }

  createProduct(NewProduct){
    return this._AngularFireDatabase.list('/products').push(NewProduct);
  }
  
  getAllProducts(){
    return this._AngularFireDatabase.list('/products').snapshotChanges()
  }

  get(productId){
    return this._AngularFireDatabase.object('/products/' + productId).valueChanges()
  }

  updateProduct(productId, product){
    return this._AngularFireDatabase.object('/products/' + productId).update(product)
  }

  deleteProduct(productId){
    return this._AngularFireDatabase.object('/products/' + productId).remove()
  }

  

}
