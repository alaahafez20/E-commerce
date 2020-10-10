import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {

  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;

  displayedColumns: string[] = ['position', 'title', 'price', 'forEdit'];

  constructor(private _ProductService:ProductService) {

    this.subscription = _ProductService.getAllProducts().subscribe(products => {

      this.dataSource = new MatTableDataSource(products)
      this.dataSource.paginator = this.paginator;
      
      for(let i = 0; i < products.length; i++){
        this.dataSource.filteredData[i]['position'] = i+1
      }
      
    })
  }

  ngOnInit(){}
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}

  


