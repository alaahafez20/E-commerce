import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categoriesList: any[];
  product: any;
  id;
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(_CategoryService: CategoryService, private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _ProductService: ProductService) {
    this.subscription1 = _CategoryService.getCategories().subscribe(list => {
      this.categoriesList = list
    })

    this.id = _ActivatedRoute.snapshot.paramMap.get('id')
    if (this.id)
      this.subscription2 = this._ProductService.get(this.id).subscribe(product => {
        this.product = product
        this.updateValues()
        this.myForm.updateValueAndValidity();

      })

  }

  myForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', [Validators.required]),
  });

  save(formProduct) {
    if (this.id) { this._ProductService.updateProduct(this.id, formProduct.value) }
    else { this._ProductService.createProduct(formProduct.value) }
    this._Router.navigate(['/admin/products'])
  }

  updateValues() {
    this.myForm.setValue({
      title: this.product.title,
      price: this.product.price,
      category: this.product.category,
      imageUrl: this.product.imageUrl
    });
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this._ProductService.deleteProduct(this.id)
    this._Router.navigate(['/admin/products'])
  }


  ngOnInit(): void { }
  ngOnDestroy(){
    this.subscription1.unsubscribe()
    if(this.id)
    this.subscription2.unsubscribe()

  }


}
