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
  
  usuario=this.cookie.get("nombre");
  constructor(private cookie:CookieService,private obtenerPortada:ObtenerPortadasService) { 
    
    
    
    
  }
  ngOnInit() {
   
  }
  explorar(){
  
    window.location.href="/Inicio/Normal/Explorar"; 
  }
  playlist(){
    window.location.href="/Inicio/Normal/Playlist";
  }
  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }
    
}
