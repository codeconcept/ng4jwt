import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: string = '';

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(formValue) {
    this.auth.login(formValue)
              .subscribe(
                res => {
                  this.loginUserSuccess(res.json().token);
                },
                err => {
                  this.loginUserFailure(err);
                }  
              );
  }

  loginUserSuccess(token) {
    console.log(token);
    localStorage.setItem('token', token);
    this.router.navigate(['home']);
  }
  
  loginUserFailure(error) {
    console.log('oops', error);
    this.result = 'Email ou mot de passe incorrect';
  }
}
