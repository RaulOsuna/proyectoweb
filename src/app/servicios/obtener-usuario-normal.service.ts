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
export class ObtenerUsuarioNormalService {

  presURL='https://pulse-863f8.firebaseio.com//registroNormal.json';
  constructor(private http:HttpClient) { }
  getUsuarioNormal(){
    return this.http.get(this.presURL).map(res => res);
  }
}
