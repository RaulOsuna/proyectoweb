import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-publicar-album',
  templateUrl: './publicar-album.component.html',
  styleUrls: ['./publicar-album.component.css']
})
export class PublicarAlbumComponent implements OnInit {
  selectedFile=null;
  firebase: {
    apiKey: 'AIzaSyC4um45LsiQWemYv_Kpwppzq6BwF3AtHww',
    authDomain: 'pulse-863f8.firebaseapp.com',
    databaseURL: 'https://pulse-863f8.firebaseio.com',
    projectId: 'pulse-863f8',
    storageBucket: 'pulse-863f8.appspot.com',
    messagingSenderId: '997581533112'
  }
  constructor(private http:HttpClient, private cookie:CookieService,
    ) { 
      if (this.cookie.get("rol")!="musico") {
        window.location.href="/Inicio";
      }
      if (this.cookie.get("nombre")!="") {
        if (this.cookie.get("rol")=="normal") {
          window.location.href="/Inicio/Normal";
        }
      }
  }
  
  ngOnInit() {
    
  
  }
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
  }
  
  regresar(){
    window.location.href="/Inicio/Musico";

    

  }
  
}
