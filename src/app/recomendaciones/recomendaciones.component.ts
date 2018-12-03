import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ObtenerCompartidosService} from '../servicios/obtener-compartidos.service'
import $ from 'jquery';
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  comentarios:String[]=[];nomAlbum:String[]=[];
  nomCancion:String[]=[];nomMusico:String[]=[];
  publicador:String[]=[];urlCancion:String[]=[];
  urlPortada:String[]=[];
  usuarioNormal:Boolean=false;
  usuarioMusico:Boolean=false;
  usuarioAdmin:Boolean=false;
  constructor(
    private obtCompartidos:ObtenerCompartidosService,
    private cookie:CookieService,
  ) { 
    if (this.cookie.get("rol")!="normal" && this.cookie.get("rol")!="musico" && this.cookie.get("rol")!="administrador") {
      window.location.href="/Inicio";
    }
    if (this.cookie.get("rol")=="normal") {
      this.usuarioNormal=true;
    }else if (this.cookie.get("rol")=="musico") {
      this.usuarioMusico=true;
    }else if (this.cookie.get("rol")=="administrador") {
      this.usuarioAdmin=true;
    }
    let comentarios1:String[]=[];let nomAlbum1:String[]=[];
    let nomCancion1:String[]=[];let nomMusico1:String[]=[];
    let publicador1:String[]=[];let urlCancion1:String[]=[];
    let urlPortada1:String[]=[];
    let i=0;

    this.obtCompartidos.getCompartidos().subscribe(publicaciones =>{
      for (let [key, value] of Object.entries(publicaciones)) {
        comentarios1[i]=value.comentario;
        nomAlbum1[i]=value.nomAlbum;
        nomCancion1[i]=value.nomCancion;
        nomMusico1[i]=value.nomMusico;
        publicador1[i]=value.publicador;
        urlCancion1[i]=value.urlCancion;
        urlPortada1[i]=value.urlPortada;
        i=i+1;
        
      }
      for (let index = 0; index < comentarios1.length; index++) {
        this.comentarios[index]=comentarios1[index];
        this.nomAlbum[index]=nomAlbum1[index];
        this.nomCancion[index]=nomCancion1[index];
        this.nomMusico[index]=nomMusico1[index];
        this.publicador[index]=publicador1[index];
        this.urlCancion[index]=urlCancion1[index];
        this.urlPortada[index]=urlPortada1[index];
        
      }
    });
    
    
    
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
publicar(){
  window.location.href="/Inicio/Musico/Publicar"
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
  ngOnInit() {
  }

}
