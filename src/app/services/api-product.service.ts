import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { map, toArray, filter, mergeAll, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { Product } from '../interface/product'

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  private readonly url: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }
  // private data: Array<any>;
  private getProducts() {
    return this.http.get(this.url).pipe(
      // map(product)
      mergeAll(),
      map((product: Product) => {
        product.imageArr = product.urlImage.split(/;|,/);
        if (product.discount > 0) {
          product.discountPrice = product.usualPrice * (1 - product.discount / 100);
        }
        product.new = ((new Date().getDate()) - new Date(product.createdAt).getDate()) < 7 ? true : false;
        return product;
      })
    );
  }

  getAllProducts() {
    return this.getProducts().pipe(
      toArray(),
    )
  }

  getProductById(id: any) {
    return this.getProducts().pipe(
      filter((value: Product) => value.id == id)
    )
  }

}
