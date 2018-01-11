import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../clases/product';


@Pipe({
  name: 'productFilter',
  pure: false
})
export class ProductFilterPipe implements PipeTransform {

  transform(items: Product[], filter: Product): Product[] {
    if (!items || !filter) {
      return items;
    }   
    return items.filter((item: Product) => this.applyFilter(item, filter));
  }

  applyFilter(product: Product, filter: Product): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (product[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (product[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
