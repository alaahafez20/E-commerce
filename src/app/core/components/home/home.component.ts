import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'shared/services/user.service';
import { CartService } from 'shared/services/cart.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: any[]
  categories: any[]
  category: string;
  userUid: string;
  check;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;


  constructor(_AngularFireAuth: AngularFireAuth, private _CartService: CartService, _ProductService: ProductService, private _UserService: UserService, _CategoryService: CategoryService, _ActivatedRoute: ActivatedRoute) {

    this.subscription1 = _ProductService.getAllProducts().subscribe(products => {
      this.products = products
    })
    this.subscription2 = _CategoryService.getCategories().subscribe(categories => {
      this.categories = categories
    })
    this.subscription3 = _ActivatedRoute.queryParamMap.subscribe(params => {
      this.category = params.get('category')

    })
    

  }

  ngOnInit(): void { }
  ngOnDestroy() {
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
    this.subscription3.unsubscribe()
  }
  

}
