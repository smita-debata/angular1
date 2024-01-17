import { Injectable } from '@angular/core';
import { ApiKey } from './constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertylistingsService {

  constructor(private http: HttpClient) {
  }
  getPropertyData(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.propertydata
    return this.http.get(url);
  }
  getImages(mediaId: any,): Observable<any> {
    const url = `${ApiKey.baseUrl}${ApiKey.getImages}?mediaId=${mediaId}`
    return this.http.get(url, { responseType: 'blob' },);
  }

  postLike(data:any):Observable<any>{
    const url = ApiKey.baseUrl+ApiKey.postLike
    return this.http.post(url,data)
}
}
