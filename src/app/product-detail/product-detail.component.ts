import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GetDataService } from '../services/get-data.service'
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private zoomValue:number = 2;
  product: any;
  imageElement: HTMLElement;
  constructor(private getDataService: GetDataService, private route: ActivatedRoute) { 
   
  }


  ngOnInit() {
    this.imageElement = document.querySelector("#myresult");
    this.route.paramMap.subscribe((params) => {
      console.log('id: ' + params.get('id'));
      this.getDataService.getById(params.get('id')).subscribe(value => {
        // console.log(value);
        this.product = value;
        this.imageElement.setAttribute("style",`background-image:url("${this.product.urlImage}");`);
      })
    })
    // this.imageElement = document.querySelector("#myresult");
    // this.imageElement.setAttribute("style","background-image:url('"+"https://cdn.shopify.com/s/files/1/0042/9313/2377/products/6c_bcd7cf5b-406e-4de7-800b-8a7c3f69ba3d.jpg?v=1548820247"+"')");

    fromEvent(document.querySelector('#myresult'), "mousemove").subscribe((x: MouseEvent) => {
     this.imageElement.setAttribute("style","background-size:"+ this.zoomValue*100+"%");
     this.imageElement.setAttribute("style","background-position: -"+x.offsetX*this.zoomValue+"px  -"+ x.offsetY*this.zoomValue+"px;");
    })
    fromEvent(document.querySelector('#myresult'),'mouseout').subscribe(()=>{
     this.imageElement.removeAttribute("background-position");
     this.imageElement.setAttribute("style","background-size: 100%");
      //this.imageElement.removeAttribute("background-size");
    })
  }




}
