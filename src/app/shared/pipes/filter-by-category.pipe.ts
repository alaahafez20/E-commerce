import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(products: any[], category: string): any[] {
    if(!category){
      return products
    }
    else{
      let filteredProducts = products.filter( p => p.payload.val().category == category)
      return filteredProducts
    }
  }
}
