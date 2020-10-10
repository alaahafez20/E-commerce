import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth.guard';
import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  {path:'products', canActivate:[AuthGuard], component:ProductsComponent},
  {path:'shopping-cart', canActivate:[AuthGuard], component:ShoppingCartComponent},
  {path:'check-out', canActivate:[AuthGuard],component:CheckOutComponent},
  {path:'order-details/:id', canActivate:[AuthGuard],component:OrderDetailsComponent},
  {path:'my/orders', canActivate:[AuthGuard], component:MyOrdersComponent},
  {path:'order-success/:id', canActivate:[AuthGuard], component:OrderSuccessComponent},
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
  ],
  imports: [
    [RouterModule.forChild(routes)],
    SharedModule,
  ]
})
export class ShoppingModule { }
