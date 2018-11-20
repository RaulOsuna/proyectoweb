import { Component, OnInit } from '@angular/core';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service';
import { CookieService } from 'ngx-cookie-service';
import {GlobalesService} from '../servicios/globales.service';
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
  constructor(
   private portadas:ObtenerPortadasService,
   private cookie:CookieService,
   private global:GlobalesService
   
  ){
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
  albumSeleccionado(portada,nombre,idAlbum,portadasImagen){

    localStorage.setItem("portada",portada);
    localStorage.setItem("nombre",nombre);
    localStorage.setItem("idAlbum",idAlbum);
    localStorage.setItem("portadasImagenes",portadasImagen);
    window.location.href="/Inicio/Musico/Explorar/Album";
    

  }
   
salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }
 

  }
