import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<any>;
  constructor(private getDataService: GetDataService) {
    this.getDataService.getAll().subscribe((products) => {
     this.products = products;
    });
  }

  ngOnInit() {
  }

}
