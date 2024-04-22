import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Observable, Subscription} from 'rxjs';
import {  map } from 'rxjs/operators';
import { IProduct } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products$ = new Observable<IProduct[]>();
  public productsSuscribcion?: Subscription;
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  //obtiene los productos
  getProducts() {
    //tuve que usar map para tratar los res del arr individualmente para poder usar el filter (de ts)
    this.products$ = this.productsService.getProducts().pipe(
      map((products: IProduct[]) => products.filter((product: IProduct) => product.type === 'gaseosa'))
    );

    this.productsSuscribcion = this.products$.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: () => {
        console.log('error');
      },
      complete: () => {
        console.log('Proceso completado');
      },
    });
  }
  //destruye el componente al cambiar de vista, para ahorrar recursos
  ngOnDestroy(): void {
    this.productsSuscribcion?.unsubscribe();
    console.log("ngdestroy")
  }
}
