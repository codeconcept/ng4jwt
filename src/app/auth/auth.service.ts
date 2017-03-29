import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';

const API_URL = 'http://localhost:3033';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(credentials): Observable<Response> {
    return this.http.post(`${API_URL}/login`, credentials);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isStillAuthenticated(): boolean {
    return tokenNotExpired('token');
  }

}