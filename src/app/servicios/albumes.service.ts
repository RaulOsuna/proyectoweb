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
export class AlbumesService {
  presURL='https://pulse-863f8.firebaseio.com//albumes.json';
  pressURL2='https://pulse-863f8.firebaseio.com//Canciones.json';
  constructor(private http:HttpClient) { }

  postTodosLosAlbumes(Albumes:any):Observable<any>{
    return this.http.post<any>(this.presURL,Albumes,httpOptions)
  }
  getTodasLasCanciones(){
    return this.http.get(this.pressURL2).map(res => res);
  }
}
