import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: any[];
  users: any[] = [];
  subscription: Subscription;

  constructor(private _OrderService: OrderService, private _UserService: UserService) {
    this.subscription = this._OrderService.getOrders().subscribe(orders => {
      this.orders = orders

      this.orders.forEach(o => this._UserService.get(o.payload.val().userUid).valueChanges()
        .subscribe(user => this.users.push(user.name))
      )
    })
  }

  ngOnInit(): void { }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  
}
