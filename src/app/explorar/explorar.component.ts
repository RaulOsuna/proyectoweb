import { Component, OnInit } from '@angular/core';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service';
import { CookieService } from 'ngx-cookie-service';
import {GlobalesService} from '../servicios/globales.service';
import $ from 'jquery';
@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
})
export class ExplorarComponent implements OnInit {
  portadasImagenes:String[]=[]; //url de imagen
  portadasMusico:String[]=[]; //nombre del musico o grupo
  portadasNomAlbum:String[]=[]; //Nombre del album
  portadasIdAlbum:String[]=[];//id del album
  portadasPrecio:String[]=[]; //precio del album
  existencia:boolean=false;
  usuario=this.cookie.get("nombre");
  //----------------------------------
  usuarioNormal:boolean=false;
  constructor(
   private portadas:ObtenerPortadasService,
   private cookie:CookieService,
   private global:GlobalesService
   
  ){
    if (this.cookie.get("rol")!="normal" && this.cookie.get("rol")!="musico") {
      window.location.href="/Inicio";
    }
    if (this.cookie.get("rol")=="normal") {
      this.usuarioNormal=true;
    }
    this.portadas.getPortada()
    .subscribe(portadasRegistradas =>{
     let i=0;
     let portadasImagenes:String[]=[];
     let portadasMusico:String[]=[];
     let portadasNomAlbum:String[]=[];
     let portadasIdAlbum:String[]=[];
     let portadasPrecio:String[]=[];
     Object.keys(portadasRegistradas).forEach(function(key) {
       //alert(key + ': ' + portadasRegistradas[key]);
       
       let nombre,albumNom,idAlbum,precio:any;
       let url:any;
       [nombre,albumNom,idAlbum,precio]= key.split(",");
     
       //EL URL DE LA IMAGEN DE LA PORTADA
     
      
       portadasImagenes[i]=portadasRegistradas[key];
       portadasMusico[i]=nombre;
       portadasNomAlbum[i]=albumNom;
       portadasIdAlbum[i]=idAlbum;
       portadasPrecio[i]=precio;
    
       
       i=i+1;
     });
     for (let i = 0; i < portadasImagenes.length; i++) {
      this.portadasImagenes[i]=portadasImagenes[i];
      this.portadasMusico[i]=portadasMusico[i];
      this.portadasNomAlbum[i]=portadasNomAlbum[i];
      this.portadasIdAlbum[i]=portadasIdAlbum[i];
      this.portadasPrecio[i]=portadasPrecio[i];
      if(this.portadasImagenes[i]!=null ||this.portadasImagenes[i]!="undefined"){
        this.existencia=true;
      }
    }
    });
  }
  ngOnInit(){}
  cambiarImagen(){
    alert('wooo');
  }
  publicar(){
    window.location.href="/Inicio/Musico/Publicar";
  }
  albumSeleccionado(portada,nombre,idAlbum,portadasImagen){

    localStorage.setItem("portada",portada);
    localStorage.setItem("nombre",nombre);
    localStorage.setItem("idAlbum",idAlbum);
    localStorage.setItem("portadasImagenes",portadasImagen);
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar/Album";
    }else{
      window.location.href="/Inicio/Musico/Explorar/Album";
    }
    
    

  }
  irInicio(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal";
    }else{
      window.location.href="/Inicio/Musico";
    }
  }
  playlist(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else{
      window.location.href="/Inicio/Musico/Playlist";
    }
  }
  explorar(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else{
      window.location.href="/Inicio/Musico/Explorar";
    }
    
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
  discografia(){
    
    window.location.href="Inicio/Musico/Discografia";
  
}
salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }
 

  }
