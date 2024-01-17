import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiKey } from './constants';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http: HttpClient) { }

  getPropertyAmenity(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.getAmenties
    return this.http.get(url);
  }
  getPropertyType(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.propertyType
    return this.http.get(url);
  }
  addPropertydetails(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = ApiKey.baseUrl + ApiKey.addproperty
    return this.http.post(url, data, { headers: headers });
  }

 
  uploadImages(propertyId: any, formData: FormData): Observable<any> {
    const url = `${ApiKey.baseUrl}${ApiKey.AddImages}?propertyId=${propertyId}`;
    return this.http.post(url, formData);
  }
  uploadVideos(propertyId: any, formData: FormData): Observable<any> {
    const url = `${ApiKey.baseUrl}${ApiKey.AddVideos}?propertyId=${propertyId}`;
    return this.http.post(url, formData);
  }
  uploadDocuments(propertyId: any, formData: FormData): Observable<any> {
    const url = `${ApiKey.baseUrl}${ApiKey.UploadDocuments}?propertyId=${propertyId}`;
    return this.http.post(url, formData);
  }
  getAllProperties(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.getallproperties;
    return this.http.get(url);
  }
  postInvestmentData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json')
    const url = ApiKey.baseUrl + ApiKey.createinvestment;
    return this.http.post(url, data);
  }
  
  DeleteInvestmentData(id: any): Observable<any> {
    const url = `${ApiKey.baseUrl}${ApiKey.deleteInvestement}/${id}`
    return this.http.delete(url);
  }
  getInvestments(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.getinvestment;
    return this.http.get(url);
  }
  getNetWorth(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.getNetworth;
    return this.http.get(url);
  }
  getLandLordProperties(): Observable<any> {
    const url = ApiKey.baseUrl + ApiKey.getLandLordProperties;
    return this.http.get(url);
  }

  postlandlordPassword(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json')
    const url = ApiKey.baseUrl + ApiKey.postlandlordpassword;
    return this.http.post(url, data);
}

}
