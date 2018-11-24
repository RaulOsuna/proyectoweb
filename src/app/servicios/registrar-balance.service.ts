import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
const httpOptions={
  headers:new HttpHeaders({'content-type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class RegistrarBalanceService {

  presURL='https://pulse-863f8.firebaseio.com//Balance.json';
  constructor(private http:HttpClient) { }
  postBalance(registro:any):Observable<any>{
    return this.http.post<any>(this.presURL,registro,httpOptions)
  }
}
