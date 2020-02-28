import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../services/api-product.service'
import { Product } from '../interface/product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isShowQuickView: boolean;
  productDetails: Product;

  products: Array<any>;
  constructor(private apiProductService: ApiProductService) {
    this.isShowQuickView = false;
    this.apiProductService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }



  getDetails(id: number) {
    this.isShowQuickView = false;
    this.apiProductService.getProductById(id).subscribe((product) => {
      this.productDetails = product;
      this.isShowQuickView = true;
      // console.log(this.isShowQuickView);
    })
  }

  ngOnInit() {
  }

}
