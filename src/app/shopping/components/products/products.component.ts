import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'shared/services/user.service';
import { CartService } from 'shared/services/cart.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[]
  categories: any[]
  category: string;
  userUid: string;
  check;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;


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
    this.subscription4 = _AngularFireAuth.authState.subscribe(user => {
      this.userUid = user.uid
    })


  }

  showBuy(productKey) {
    this.check = productKey;
  }


  buy(quantity, productKey) {
    let selectedProduct;
    for (let i = 0; i < this.products.length; i++) {
      if (productKey == this.products[i].key) {
        selectedProduct = this.products[i]
      }
    }

    let data = {
      title: selectedProduct.payload.val().title,
      price: selectedProduct.payload.val().price,
      imageUrl: selectedProduct.payload.val().imageUrl,
      quantity: quantity.value
    }

    this._CartService.createUserCart(this.userUid, data)
    this.check = null;
  }

  ngOnInit(): void { }
  ngOnDestroy() {
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
    this.subscription3.unsubscribe()
    this.subscription4.unsubscribe()
  }
  
}
