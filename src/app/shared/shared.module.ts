import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'shared/guards/auth.guard';
import { AuthService } from 'shared/services/auth.service';
import { CartService } from 'shared/services/cart.service';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { UserService } from 'shared/services/user.service';
import { SearchPipe } from './pipes/search.pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchPipe,
    FilterByCategoryPipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchPipe,
    FilterByCategoryPipe,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    AuthGuard,
    CartService,
  ]
})
export class SharedModule { }
