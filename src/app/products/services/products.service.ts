import { Injectable } from '@angular/core';
import { PRODUCTS_DATA } from '../../data/products.data';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts() {
    return of(PRODUCTS_DATA);
  }
  
}
