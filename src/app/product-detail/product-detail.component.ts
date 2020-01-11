import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {GetDataService} from '../services/get-data.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:any;
  constructor(private getDataService:GetDataService,private route:ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      console.log('id: '+ params.get('id'));
      this.getDataService.getById(params.get('id')).subscribe(value=>{
        // console.log(value);
        this.product = value;
      })
    })
  }

}
