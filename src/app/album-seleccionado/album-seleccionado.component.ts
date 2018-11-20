import { Component, OnInit } from '@angular/core';
import {AlbumesService} from '../servicios/albumes.service';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service'
import { CookieService } from 'ngx-cookie-service';
import { Routes} from '@angular/router';
@Component({
  selector: 'app-album-seleccionado',
  templateUrl: './album-seleccionado.component.html',
  styleUrls: ['./album-seleccionado.component.css']
})
export class AlbumSeleccionadoComponent implements OnInit {
  usuario=this.cookie.get("nombre");
  cancionesDB:any[]=[]; //Aqui se guardan las canciones
  musicaNombre:any[]=[]; //aqui el nombre de las canciones
  urlPortada=localStorage.getItem("portadasImagenes"); //url de portada
  nombreMusico=localStorage.getItem("portada"); //nombre del musico
  nombreAlbum=localStorage.getItem("nombre"); //nombre del album
  precioAlbum;
    
  constructor( 
    private album:AlbumesService,
    private cookie:CookieService,
    private portada:ObtenerPortadasService
  ) { 

   /*AQUI SE OBTIENEN LAS CANCIONES DEL ALBUM */
   this.album.getTodasLasCanciones()
      .subscribe(musicas =>{
        let i=0;
        let canciones:any[]=[];
        let nombreCancion:any[]=[];
        Object.keys(musicas).forEach(function(key) {
          
          let nombre1,cancionNom,idAlbum1:string;
          [nombre1,cancionNom,idAlbum1]= key.split(",");
          
          // console.log(key);//esto obtiene el nombre del key
         // console.log(musicas[key]);//este el valor del key
        
          if ((nombre1==localStorage.getItem("portada"))&&(idAlbum1==localStorage.getItem("idAlbum"))) {
            
            canciones[i] = musicas[key];
            nombreCancion[i]=cancionNom;
            i=i+1;
          }
          
        });
        for (let x = 0; x < canciones.length; x++) {
          this.cancionesDB[x]=canciones[x];
          this.musicaNombre[x]=nombreCancion[x];

        }
      });
      /*AQUI SE OBTIENE EL PRECIO DEL ALBUM */
      this.portada.getPortada()
      .subscribe(portadas =>{
        let precio1:String;
        let i=0;
        let nombre1,nomAlbum,idAlbum,precio:string;
        Object.keys(portadas).forEach(function(key) {
          
          [nombre1,nomAlbum,idAlbum,precio]= key.split(",");
          if ((nombre1==localStorage.getItem("portada"))&&(idAlbum==localStorage.getItem("idAlbum"))) {
            
            precio1= precio;
            
          }
          i=i+1;
        });
        this.precioAlbum=precio1;
        
      });
  }
  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }

  ngOnInit() {
    
  }
    
    
}
