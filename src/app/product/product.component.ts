import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../services/api-product.service';
import { Product } from '../interface/product'
import { Category } from '../interface/category';
import { ApiCategoryService } from '../services/api-category.service';
import { GetFilterProduct } from '../interface/get-filter-product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isShowFilter: boolean;
  isShowSpinner: boolean;
  isShowQuickView: boolean;

  productRepo: Product[]=[];

  products: Product[]=[];
  productDetails: Product;

  categories: Category[];

  constructor(private readonly apiProductSevice: ApiProductService, private readonly apiCategoryService: ApiCategoryService) {
    this.isShowFilter = false;
    this.isShowQuickView = false;
    this.isShowSpinner = true;

    this.apiProductSevice.getAllProducts().subscribe((products: Product[]) => {
      this.productRepo = products;
      this.products= this.products.concat(this.productRepo);
      console.log(this.products);
      this.isShowSpinner = false;
    });

  

    this.apiCategoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    })

  }

  showFilterTable(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  getDetails(id: number) {
    this.isShowQuickView = false;
    this.apiProductSevice.getProductById(id).subscribe(product => {
      this.productDetails = product;
      this.isShowQuickView = true;
      // console.log(this.isShowQuickView);
    })
  }


  getFilter(getFilterProduct:GetFilterProduct):Product[]{
    const {categoryId,discount} = getFilterProduct;

    this.products = [].concat(this.productRepo);
    
    if(categoryId){
      this.products = this.products.filter(product => product.category.id === categoryId);
    }

    if(discount){
      this.products = this.products.filter(product => product.discount >= discount);
    }

    this.showFilterTable();
    
    return this.products;
  }

  changeSortBy(value: string) {
    switch (value) {
      case '1':
        this.products = this.products.sort((a: Product, b: Product) => a.usualPrice - b.usualPrice)
        break;
      case '2':
        this.products = this.products.sort((a: Product, b: Product) => b.usualPrice - a.usualPrice)
        break;
      default:
        console.log(this.productRepo)
        this.products = [].concat(this.productRepo);
        console.log(this.productRepo)
        break;
    }
  }

  ngOnInit() {
  }

}
