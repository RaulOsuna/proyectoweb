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
export class EliminarCancionService {
  presURL='https://pulse-863f8.firebaseio.com//Canciones';
  constructor(private http:HttpClient) { }

  delCancion(id:String){
    const url=`${this.presURL}/${id}.json` ;
    return this.http.delete(url);
  }
}
