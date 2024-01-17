import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKey } from './constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = ApiKey.baseUrl + ApiKey.register
    return this.http.post<any>(url, data, { headers: headers });
  }
  login(data: any): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.login
    return this.http.post<any>(url, data);
  }
  getRolefromUser() {
    const accesstoken = sessionStorage.getItem('AccessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accesstoken}`,
      'Content-Type': 'application/json'
    });
    const url = ApiKey.baseUrl + ApiKey.currentUser
    return this.http.get<any>(url, { headers: headers });
  }
}
