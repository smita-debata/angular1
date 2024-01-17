import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  accessToken: any;
  userRole: any;

  getUserRole() {
    this.userRole = sessionStorage.getItem("Role")
    return this.userRole;
  }
  getAccessToken() {
    this.accessToken = sessionStorage.getItem('AccessToken')
    return this.accessToken;
  }
}
