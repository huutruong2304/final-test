import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isShowLogin: boolean;
  products: Array<any>;
  constructor() {
    this.products = [
      { id: 1, name: "Túi", qty: 1, urlImage: "https://cdn.shopify.com/s/files/1/0042/9313/2377/products/5a_09e8d505-63fb-4ae1-b2ab-efbe51967ebe.jpg?v=1536938698", price: 20000 },
      { id: 2, name: "Túi 2", qty: 1, urlImage: "https://cdn.shopify.com/s/files/1/0042/9313/2377/products/5a_09e8d505-63fb-4ae1-b2ab-efbe51967ebe.jpg?v=1536938698", price: 20000 },
      { id: 3, name: "Túi 3", qty: 1, urlImage: "https://cdn.shopify.com/s/files/1/0042/9313/2377/products/5a_09e8d505-63fb-4ae1-b2ab-efbe51967ebe.jpg?v=1536938698", price: 20000 },
      { id: 4, name: "Túi 4", qty: 1, urlImage: "https://cdn.shopify.com/s/files/1/0042/9313/2377/products/5a_09e8d505-63fb-4ae1-b2ab-efbe51967ebe.jpg?v=1536938698", price: 30000 }
    ];
    this.isShowLogin = false;

  }

  showLoginTable(){
    this.isShowLogin=!this.isShowLogin;
  }
  ngOnInit() {
  }

}
