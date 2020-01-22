import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import {Product} from '../interface/product'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isShowFilter:boolean;
  isShowSpinner:boolean;
  isShowQuickView:boolean;
  productDetails:Product;

  products: Array<any>;
  constructor(private getDataService: GetDataService) {
    this.isShowFilter=false;
    this.isShowQuickView=false;
    this.isShowSpinner=true;
    this.getDataService.getAll().subscribe((products) => {
     this.products = products;
     this.isShowSpinner=false;
    });
  }

  showFilterTable(){
    this.isShowFilter= !this.isShowFilter;
  }

  getDetails(id:number){
    this.isShowQuickView=false;
   this.getDataService.getById(id).subscribe(product=>{
    this.productDetails = product;
    this.isShowQuickView=true;
    console.log(this.isShowQuickView);
   })
  }

  ngOnInit() {
  }

}
