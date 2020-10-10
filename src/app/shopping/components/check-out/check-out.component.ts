import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { CartService } from 'shared/services/cart.service'
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})



export class CheckOutComponent implements OnInit, OnDestroy {

  userUid: string;
  carts: any[];
  totalCost: number;
  subscription:Subscription

  constructor(private _CartService: CartService, private _Router:Router,private _OrderService: OrderService, private _AngularFireAuth: AngularFireAuth) {
    this.subscription = _AngularFireAuth.authState.subscribe(user => {
      this.userUid = user.uid
      this._CartService.getCart(this.userUid).subscribe(carts => {
        this.carts = carts
        this.calculateCost()
      })

    })
  }

  checkForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    line1: new FormControl('', Validators.required),
    line2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
  });

  save(checkForm) {
    let order = new Order(this.userUid, checkForm.value, this.carts)
    this._OrderService.createOrder(order).then( p => {
      this._CartService.clearAll(this.userUid)
      this._Router.navigate(['/shop/order-success', p.key])
    })
    
  }

  calculateCost(){
    let total = 0;
    for(let i = 0; i < this.carts.length; i++){
      let totalPrice = this.carts[i].payload.val().price * this.carts[i].payload.val().quantity 
      total += totalPrice
    }
    this.totalCost = total
  }
  

  ngOnInit(): void { }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
