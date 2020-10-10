import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  userUid: string;
  myOrders: any[];
  userName: string;
  subscription:Subscription;

  constructor(_OrderService:OrderService, _AngularFireAuth: AngularFireAuth) {
    this.subscription = _AngularFireAuth.authState.subscribe( user => {
      this.userName = user.displayName
      this.userUid = user.uid
      _OrderService.getOrders().subscribe( orders => {
        this.myOrders = orders.filter( o => o.payload.val()['userUid'] == this.userUid )
      })
    })
   }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
