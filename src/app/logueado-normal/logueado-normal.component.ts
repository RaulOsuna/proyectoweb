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
  
  nombreMusico=this.cookie.get("nombre");
  constructor(private cookie:CookieService,private obtenerPortada:ObtenerPortadasService) { 
    if (this.cookie.get("rol")!="normal") {
      window.location.href="/Inicio";
    }
    
    
    
  }
  ngOnInit() {
   
  }
  irInicio(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador";
    }
  }
  discografia(){
    
    window.location.href="Inicio/Musico/Discografia";
  
}

recomendaciones(){
  if (this.cookie.get("rol")=="normal") {
    window.location.href="/Inicio/Normal/Recomendaciones";
  }else if(this.cookie.get("rol")=="musico"){
    window.location.href="/Inicio/Musico/Recomendaciones";
  }else if(this.cookie.get("rol")=="administrador"){
    window.location.href="/Inicio/Administrador/Recomendaciones";
  }
}


  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }
  playlist(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Playlist";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Playlist";
    }
  }
  categorias(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Categorias";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Categorias";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Categorias";
    }
  }

  explorar(){

    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Explorar";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Explorar";
    }
    
  }
  admin(){
    if (this.cookie.get("rol")=="administrador") {
      window.location.href="Inicio/Administrador/Administracion";
    }
  }
  buscar(){
    let buscar:String=$("#buscarBox").val();
    if (buscar!="") {
      localStorage.setItem("buscar",String(buscar));
      if (this.cookie.get("rol")=="normal") {
        window.location.href="/Inicio/Normal/Busqueda";
      }else if(this.cookie.get("rol")=="musico"){
        window.location.href="/Inicio/Musico/Busqueda";
      }else if(this.cookie.get("rol")=="administrador"){
        window.location.href="/Inicio/Administrador/Busqueda";
      }
    }else{
      alert("No ha ingresado un valor");
    }
  }
    
}
