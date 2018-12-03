import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service';
import $ from 'jquery';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  usuarioNormal:boolean=false;
  usuarioMusico:boolean=false;
  usuarioAdmin:boolean=false;
  usuario=this.cookie.get("nombre");
  portadasImagenes:String[]=[]; //url de imagen
  portadasMusico:String[]=[]; //nombre del musico o grupo
  portadasNomAlbum:String[]=[]; //Nombre del album
  portadasIdAlbum:String[]=[];//id del album
  portadasPrecio:String[]=[]; //precio del album
  portadasEstado:String[]=[];//Estado del album
  existencia:boolean=false;
 
  constructor(
    private cookie:CookieService,
    private portadas:ObtenerPortadasService,
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

    
    this.portadas.getPortada()
    .subscribe(portadasRegistradas =>{
     let i=0;
     let portadasImagenes:String[]=[];
     let portadasMusico:String[]=[];
     let portadasNomAlbum:String[]=[];
     let portadasIdAlbum:String[]=[];
     let portadasPrecio:String[]=[];
     let portadasEstado:String[]=[];
     Object.keys(portadasRegistradas).forEach(function(key) {
       //alert(key + ': ' + portadasRegistradas[key]);
       
       let nombre,albumNom,idAlbum,precio,estado:any;
       let url:any;
       [nombre,albumNom,idAlbum,precio,estado]= key.split(",");
     
       //EL URL DE LA IMAGEN DE LA PORTADA
     
      //SI EL ESTADO ES B NO SE MUESTRA POR QUE NO HA SIDO APROBADO
       if (estado=="B") {
        portadasImagenes[i]=portadasRegistradas[key];
        portadasMusico[i]=nombre;
        portadasNomAlbum[i]=albumNom;
        portadasIdAlbum[i]=idAlbum;
        portadasPrecio[i]=precio;
        portadasEstado[i]=estado;
        
        i=i+1;
       }
     });
     for (let i = 0; i < portadasImagenes.length; i++) {
      this.portadasImagenes[i]=portadasImagenes[i];
      this.portadasMusico[i]=portadasMusico[i];
      this.portadasNomAlbum[i]=portadasNomAlbum[i];
      this.portadasIdAlbum[i]=portadasIdAlbum[i];
      this.portadasPrecio[i]=portadasPrecio[i];
      this.portadasEstado[i]=portadasEstado[i];
      if(this.portadasImagenes[i]!=null ||this.portadasImagenes[i]!="undefined"){
        this.existencia=true;
      }
    }
    });
  }
  salir(){
    this.cookie.deleteAll("/");
    window.location.href="/Inicio"; 
  }
  albumSeleccionado(portada,nombre,idAlbum,portadasImagen,estado){

    localStorage.setItem("portada",portada);
    localStorage.setItem("nombre",nombre);
    localStorage.setItem("idAlbum",idAlbum);
    localStorage.setItem("portadasImagenes",portadasImagen);
    localStorage.setItem("portadasEstado",estado);
    window.location.href="/Inicio/Administrador/Explorar/Album";
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
  publicar(){
    window.location.href="/Inicio/Musico/Publicar";
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
      }else if(this.cookie.get("rol")=="administrador"){
        window.location.href="/Inicio/Administrador/Busqueda";
      }
    }else{
      alert("No ha ingresado un valor");
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
  ngOnInit() {
  }

  
}
