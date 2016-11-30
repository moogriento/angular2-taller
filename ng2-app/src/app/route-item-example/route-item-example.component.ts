import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService } from '../example/example.service';
import { NgbdDatepickerPopup } from './datepicker-popup';

import IProduct = Example.Models.IProduct;

@Component({
  selector: 'route-item-example',
  templateUrl: 'route-item-example.component.html'
})
export class RouteItemComponent implements OnInit {
  @Input() product: any;

  private id: any;

  constructor(
    private exampleService: ExampleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (!this.product) {
      //SNAPSHOT: THE NO-OBSERVABLE ALTERNATIVE
      // this.id = +this.route.snapshot.params['id'];
      //  this.getProduct();

      this.route.params
        .map(params => params['id'])
        .do(id => this.id = + id)
        .subscribe(id => {

          if (id !== 'new') {
            this.getProduct();
          } else {
            this.product = {};
          }
        });
    }
  }

  private getProduct() {
    this.exampleService.getProduct(this.id)
      .subscribe(character => this.setEditCharacter(character));
  }

  private gotoProducts() {
    let route = ['/products'];
    this.router.navigate(route);
  }

  private setEditCharacter(product: IProduct) {
    if (product) {
      // no time for momentjs xd
      if (product.releaseDate) {
        let date = new Date(product.releaseDate);
        console.log('date', date);
        product.releaseDateFormat = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        };
      }
      this.product = product;
    } else {
      this.gotoProducts();
    }
  }

  // refactor
  private saveProduct() {

    let releaseDate = this.product.releaseDateFormat;

    if (releaseDate) {
      this.product.releaseDate = releaseDate.year + '-' + releaseDate.month + '-' + releaseDate.day;
      delete this.product.releaseDateFormat;
    }

    if (!this.product.id) {
      this.exampleService.saveProduct(this.product).subscribe(result => {
          this.router.navigate(['/products'], { });
      });
    } else {
      this.exampleService.updateProduct(this.product).subscribe(result => {
          this.router.navigate(['/products'], { });
      });
    }
  }
}
