import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service'
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
  constructor(private getDataService: GetDataService) {
    this.isShowQuickView = false;
    this.getDataService.getAll().subscribe((products) => {
      this.products = products;
    });
  }



  getDetails(id: number) {
    this.isShowQuickView = false;
    this.getDataService.getById(id).subscribe(product => {
      this.productDetails = product;
      this.isShowQuickView = true;
      console.log(this.isShowQuickView);
    })
  }

  ngOnInit() {
  }

}
