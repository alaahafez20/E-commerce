import { NgModule } from '@angular/core';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth.guard';
import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  {path:'products/new', canActivate:[AuthGuard,AdminAuthGuard], component:ProductFormComponent},
  {path:'products/:id', canActivate:[AuthGuard,AdminAuthGuard], component:ProductFormComponent},
  {path:'products', canActivate:[AuthGuard,AdminAuthGuard], component:AdminProductsComponent},
  {path:'orders', canActivate:[AuthGuard,AdminAuthGuard], component:AdminOrdersComponent}
  
];

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    CustomFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    AdminAuthGuard
  ]

})

export class AdminModule { }
