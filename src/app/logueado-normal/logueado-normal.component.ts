import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import $ from 'jquery';
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
  
  usuario=this.cookie.get("nombre");
  constructor(private cookie:CookieService,private obtenerPortada:ObtenerPortadasService) { 
    
    
    
    
  }
  ngOnInit() {
   
  }
  buscar(){
    let buscar:String=$("#buscarBox").val();
    if (buscar!="") {
      localStorage.setItem("buscar",String(buscar));
      if (this.cookie.get("rol")=="normal") {
        window.location.href="/Inicio/Normal/Busqueda";
      }else{
        window.location.href="/Inicio/Musico/Busqueda";
      }
    }else{
      alert("No ha ingresado un valor");
    }
  }
  explorar(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else{
      window.location.href="/Inicio/Musico/Explorar";
    }
    
  }
  playlist(){
    window.location.href="/Inicio/Normal/Playlist";
  }
  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }
    
}
