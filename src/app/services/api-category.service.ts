import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeAll, map, toArray } from 'rxjs/operators';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  private readonly url:string = 'https://server-final-test.herokuapp.com/categories';
  constructor(private http:HttpClient) { 
  }

  private getCategories(){
    return this.http.get(this.url).pipe(
      mergeAll()
    );
  }

  getAllCategories(){
    return this.getCategories().pipe(
      toArray()
    )
  }


}
