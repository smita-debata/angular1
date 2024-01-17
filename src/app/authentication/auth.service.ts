import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, private http: HttpClient) { }
  loggedIn() {
    const tokenkey = sessionStorage['AccessToken'] != undefined
    return tokenkey;
  }
  logOut() {
    // sessionStorage.removeItem('token');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('AccessToken');
    this.route.navigate(['/'])

  }
  getUserData() {
    return this.http.get('http://20.127.32.150:443/auth/current-user');
  }
}
