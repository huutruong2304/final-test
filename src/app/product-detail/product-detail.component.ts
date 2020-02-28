import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ApiProductService } from '../services/api-product.service'
import { of, fromEvent } from 'rxjs';
import { Product } from '../interface/product'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetails: Product;
  relatedProducts: Array<any>;
  imageEle: HTMLElement;
  qtyToCart: number;
  isShowQuickView: boolean;
  constructor(private apiProductService: ApiProductService, private route: ActivatedRoute) {
    this.relatedProducts = [];
    this.qtyToCart = 1;
    this.isShowQuickView = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // console.log('id: ' + params.get('id'));
      this.apiProductService.getProductById(params.get('id')).subscribe((product: Product) => {
        this.productDetails = product;
      })
      this.apiProductService.getAllProducts().subscribe((value) => {
        this.relatedProducts = value;
      })
    })
  }

  changeQtyToCart(value: boolean) {
    switch (value) {
      case true:
        if (this.qtyToCart < this.productDetails.qty) {
          this.qtyToCart++;
        }
        console.log(this.qtyToCart);
        break;
      case false:
        if (this.qtyToCart > 1) {
          this.qtyToCart--;
        }
        console.log(this.qtyToCart);

        break;
    }
  }

  passSlide(value: boolean, classCarousel: string = '.slide-related-product', speed: number = 400) {
    if (value) {
      document.querySelector(classCarousel).scrollBy(speed, 0);
    }
    else {
      document.querySelector(classCarousel).scrollBy(-speed, 0);
    }
  }

  getDetails(id: number) {
    this.isShowQuickView = false;
    this.apiProductService.getProductById(id).subscribe(product => {
      this.productDetails = product;
      this.isShowQuickView = true;
      console.log(this.isShowQuickView);
    })
  }
}
