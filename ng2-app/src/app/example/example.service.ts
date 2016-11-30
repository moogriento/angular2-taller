import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ExampleService {
  products: Array<Example.Models.IProduct>;
  productsObserver: Observable<Example.Models.IProduct[]>;
  constructor(private http: Http) { }
  getListProducts():  Observable<Example.Models.IProduct[]> {
    this.productsObserver = this.http.get('http://localhost:3000/products')
      .map((res: Response) => res.json());
    return this.productsObserver;
  }
  getTranslate():Observable<any>{
    return this.http.get('http://localhost:3000/translateData')
            .map((res: Response) => res.json());
  }
  getProduct(id: number) {
    return this.getListProducts().
    map(products => products.find(product => product.id == id));
  }

  saveProduct(product: Example.Models.IProduct) {
    delete product.id;
    return this.http.post('http://localhost:3000/products', product)
            .map((res: Response) => res.json());
  }

  updateProduct(product: Example.Models.IProduct) {
    return this.http.put('http://localhost:3000/products/' + product.id, product)
            .map((res: Response) => res.json());
  }

  deleteProduct(id: number) {
    return this.http.delete('http://localhost:3000/products/' + id)
            .map((res: Response) => res.json());
  }
}
