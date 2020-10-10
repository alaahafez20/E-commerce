import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'shared/services/cart.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  userUid: string;
  carts: any[]
  totalCost: number;
  subscription:Subscription;

  constructor(private _CartService:CartService, _AngularFireAuth: AngularFireAuth) {
    this.subscription = _AngularFireAuth.authState.subscribe( user => {
      this.userUid = user.uid
      _CartService.getCart(this.userUid).subscribe( carts => {
        this.carts = carts 
        this.calculateCost()
      })
    }) 
  }

  delete(cartKey){
    this._CartService.deleteCart(this.userUid, cartKey)
  }
  save(cartKey,cartQuantity){
    this._CartService.saveCart(this.userUid, cartKey, cartQuantity)
  }

  calculateCost(){
    let total = 0;
    for(let i = 0; i < this.carts.length; i++){
      let totalPrice = this.carts[i].payload.val().price * this.carts[i].payload.val().quantity 
      total += totalPrice
    }
    this.totalCost = total
  }

  clearAll(){
    this._CartService.clearAll(this.userUid)
  }

  
  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
