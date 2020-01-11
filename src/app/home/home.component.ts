import { Component, OnInit } from '@angular/core';
import {GetDataService} from '../services/get-data.service'
import {Product} from '../interface/product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<any>;
  constructor(private getDataService: GetDataService) {
    this.getDataService.getAll().subscribe((products) => {
     this.products = products;
    });
  }
  delete(product:Product){
    this.products = this.products.filter(x=>x!==product)
  }


  ngOnInit() {
  }

}
