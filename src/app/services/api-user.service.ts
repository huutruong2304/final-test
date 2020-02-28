import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../interface/user';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private readonly url: string = 'https://server-final-test.herokuapp.com/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  curentUser = {}; 
  
  constructor(private http: HttpClient,private router:Router) { }

  signUp(user: User):Observable<any>{
    return this.http.post(`${this.url}/signup`,user).pipe(
      catchError(this.handleError)
    );
  }


  signIn(user:User){
    return this.http.post(`${this.url}/signin`,user).pipe(
      tap((res:any)=>{
        localStorage.setItem('accessToken',res.accessToken);
      })
    )
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('accessToken');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('accessToken');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}
