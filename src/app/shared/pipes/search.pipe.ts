import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(dataSource: any, searchTerm:string) :any {
    if(searchTerm == 'undefined' || searchTerm == null) return dataSource;
    else {
      let filteredProducts = dataSource.filteredData.filter( x => 
        x.payload.val().title.toLowerCase().includes(searchTerm.toLowerCase()))
      return filteredProducts
    }
  }

}
