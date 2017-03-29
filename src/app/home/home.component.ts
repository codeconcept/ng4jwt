import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if(this.auth.isStillAuthenticated()){
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

}
