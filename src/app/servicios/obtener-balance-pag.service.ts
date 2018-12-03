import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable,Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const httpOptions={
  headers:new HttpHeaders({'content-type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ObtenerBalancePagService {

  presURL='https://pulse-863f8.firebaseio.com//BalancePulse.json';
  constructor(private http:HttpClient) { }
  getBalancePulse(){
    return this.http.get(this.presURL).map(res => res);
  }
}
