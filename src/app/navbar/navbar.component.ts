import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../interface/product';
import { ApiUserService } from '../services/api-user.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formSignUp: FormGroup;
  formSignIn: FormGroup;


  isLoggedIn: boolean;
  isSignedUp: boolean = false;
  isShowLogin: boolean;
  products: Product[] = [];


  constructor(private formBuilder: FormBuilder,private apiUserService: ApiUserService) { }

  ngOnInit() {
    this.isLoggedIn = this.apiUserService.isLoggedIn;
    this.isShowLogin = false;
    //form đăng kí
    this.formSignUp = this.formBuilder.group({
      email: ['',
        [
          Validators.email,
          Validators.required
        ]
      ],
      username: ['',
        [
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ]
      ],
      password: ['',
        [
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ]
      ]
    });


    //form đăng nhập
    this.formSignIn = this.formBuilder.group({
      email: ['',
        [
          Validators.email,
          Validators.required
        ]
      ],
      password: ['',
        [
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ]
      ]
    })

  }

  showLoginTable() {
    this.isShowLogin = !this.isShowLogin;
  }

  signUp() {
      this.apiUserService.signUp(this.formSignUp.value).subscribe(()=>{
        this.isSignedUp = !this.isSignedUp;
      });
  }

  signIn() {
      this.apiUserService.signIn(this.formSignIn.value).subscribe(()=>{
        this.showLoginTable();
        this.isLoggedIn =this.apiUserService.isLoggedIn;
      });
    
  }

  signOut(){
    this.apiUserService.doLogout();
    this.showLoginTable();
    this.isLoggedIn =this.apiUserService.isLoggedIn;
  }




}
// function passwordValidator(formControl:FormControl){
//     if(formControl.value.length<6 || formControl.value.length>20){
//       return {length: true};
//     }

//     // if(formControl.value.match( /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)===''){
//     //   return {match: true}
//     // }

//     return null
// }