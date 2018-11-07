import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
/*cookies */
import { CookieService } from 'ngx-cookie-service';
/*firebase */
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
/*SERVICIO */
import { ObtenerPortadasService } from '../servicios/obtener-portadas.service';

@Component({
  selector: 'app-logueado-normal',
  templateUrl: './logueado-normal.component.html',
  styleUrls: ['./logueado-normal.component.css']
})
export class LogueadoNormalComponent implements OnInit {
  /*DATOS DE LA PORTADA */
  portadas:any[]=[];
  /*DONDE SE VACIAN LOS DATOS */
  albumNombre:any[]=[];
  musico:any[]=[];
  idAlbum:any[]=[];
  /*DATOS DE LAS CANCIONES */
  Canciones:any[]=[];

  constructor(private cookie:CookieService,private obtenerPortada:ObtenerPortadasService) { 
    console.log(this.cookie.get('Correo'));
    console.log(this.cookie.get('Contraseña'));
    
    this.obtenerPortada.getPortada()
    .subscribe(Portadas =>{
        
        /*SE OBTIENE EL NOMBRE DEL ARCHIVO
        POR EJEMPLO: PXNDA,Poetic,1.jpg donde
        PXNDX = nombre del grupo o banda
        Poetic=nombre album, 
        1=id album
        SE GUARDAN EN LOS ARREGLOS DONDE
        musico[1]=nombre del musico, su nomb album seria album[1] y su idalbum[1]
        */
       let i=0;
       for (let value of Object.keys(Portadas)) {
        alert(value); 
        let [musico, album,idAlbum] =String(value).split(',');
        this.musico[i]=musico;
        this.albumNombre[i]=album;
        this.idAlbum[i]=idAlbum;
        console.log(this.musico[i]);
        console.log(this.albumNombre[i]);
        console.log(this.idAlbum[i]);
        i++;
      }
      
      
    });
    
    
    
  }
  opened=false;
  ngOnInit() {
    firebase.initializeApp( {
      apiKey: "AIzaSyC4um45LsiQWemYv_Kpwppzq6BwF3AtHww",
      authDomain: "pulse-863f8.firebaseapp.com",
      databaseURL: "https://pulse-863f8.firebaseio.com",
      projectId: "pulse-863f8",
      storageBucket: "pulse-863f8.appspot.com",
      messagingSenderId: "997581533112"
    })
  }
  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  salir(){
    console.log(firebase.auth().currentUser);
    firebase.auth().signOut().then(function() {
      console.log('salio');
      window.location.href="/Inicio"

    }).catch(function(error) {
      console.log('ocurrio algo');
    });
    console.log(firebase.auth().currentUser);
  }
}
