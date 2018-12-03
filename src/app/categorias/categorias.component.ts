import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AlbumesService } from '../servicios/albumes.service';
import { CookieService } from 'ngx-cookie-service';
import { ObtenerPortadasService } from '../servicios/obtener-portadas.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  usuario=this.cookie.get("nombre");
  cancionesDB:any[]=[]; //Aqui se guardan las canciones
  musicaNombre:any[]=[]; //aqui el nombre de las canciones
  nomMusico:any[]=[];//nombre de musicos
  mostrar:Boolean=false;
  usuarioAdmin:Boolean=false;
  usuarioMusico:Boolean=false;
  usuarioNormal:Boolean=false;
  constructor(
    private album:AlbumesService,
    private cookie:CookieService,
    private portada:ObtenerPortadasService,

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
  }

  ngOnInit() {
  }

  genero(){
    for (let x = 0; x < this.nomMusico.length; x++) {
      this.nomMusico[x]="";
      this.cancionesDB[x]="";
      this.musicaNombre[x]="";
      
    }
    var dropdown=$('#generoBox option:selected').val();
    /*AQUI SE OBTIENEN LAS CANCIONES DEL ALBUM */
   this.album.getTodasLasCanciones()
   .subscribe(musicas =>{
     let i=0;
     let canciones:any[]=[];
     let nombreCancion:any[]=[];
     let nombresmusicos:any[]=[];
     
     Object.keys(musicas).forEach(function(key) {
       
       let nombre1,cancionNom,idAlbum1,genero,idCancion:string;
       [nombre1,cancionNom,idAlbum1,genero,idCancion]= key.split(",");
       
       // console.log(key);//esto obtiene el nombre del key
      // console.log(musicas[key]);//este el valor del key
     
       if (genero==dropdown) {
         nombresmusicos[i]=nombre1;
         canciones[i] = musicas[key];
         nombreCancion[i]=cancionNom;
        
         i=i+1;
       }
       
     });
     for (let x = 0; x < canciones.length; x++) {
       this.nomMusico[x]=nombresmusicos[x];
       this.cancionesDB[x]=canciones[x];
       this.musicaNombre[x]=nombreCancion[x];

     }
     if (this.nomMusico[0]!="") {
       this.mostrar=true;
     }else{
       this.mostrar=false;
     }
   });
   
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
  playlist(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Playlist";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Playlist";
    }
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
  categorias(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Categorias";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Categorias";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Categorias";
    }
  }
  publicar(){
    window.location.href="/Inicio/Musico/Publicar";
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
  salir(){
    this.cookie.deleteAll("/");
    window.location.href="/Inicio"; 
  }
  
  discografia(){
    
      window.location.href="Inicio/Musico/Discografia";
    
  }
}
