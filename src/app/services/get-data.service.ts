import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs'; 
import { map ,toArray,filter,mergeAll, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import {Product} from '../interface/product'

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private url = 'https://my-json-server.typicode.com/huutruong2304/demo/products';
  constructor(private http: HttpClient) { }
  // private data: Array<any>;
  getData(){
    return this.http.get(this.url).pipe(
      mergeAll()
    );
  }

  getAll(){
    return this.getData().pipe(
      toArray()
    )
  }

  getById(id:any){
    return this.getData().pipe(
      filter((value:Product)=>value.id==id)
    )
  }


}
