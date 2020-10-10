import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  orderKey: string;
  order: any;
  Carts: any[]
  totalCost: number;
  subscription:Subscription;

  constructor(_ActivatedRoute:ActivatedRoute, _OrderService:OrderService) {
    this.orderKey = _ActivatedRoute.snapshot.paramMap.get('id')
    this.subscription = _OrderService.getOrders().subscribe( orders => {
      this.order = orders.find( o => o.key == this.orderKey)
      this.Carts = this.order.payload.val().Carts
      this.calculateCost()

    })
    
  }

  calculateCost(){
    let total = 0;
    for(let i = 0; i < this.Carts.length; i++){
      let totalPrice = this.Carts[i].price * this.Carts[i].quantity 
      total += totalPrice
    }
    this.totalCost = total
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
