import { Component, OnInit } from '@angular/core';
import { ObtenerPortadasService } from '../servicios/obtener-portadas.service';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  portadasImagenes:String[]=[]; //url de imagen
  portadasMusico:String[]=[]; //nombre del musico o grupo
  portadasNomAlbum:String[]=[]; //Nombre del album
  portadasIdAlbum:String[]=[];//id del album
  portadasPrecio:String[]=[]; //precio del album
  existencia:boolean=false;
  usuario=this.cookie.get("nombre");
  //----------------------------------
  usuarioNormal:boolean=false;
  usuarioMusico:boolean=false;
  usuarioAdmin:boolean=false;
  constructor(
   private portadas:ObtenerPortadasService,
   private cookie:CookieService,
 
   
  ){
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

     let buscando=localStorage.getItem("buscar");
     Object.keys(portadasRegistradas).forEach(function(key) {
       //alert(key + ': ' + portadasRegistradas[key]);
       
       let nombre,albumNom,idAlbum,precio,estado:any;
       let url:any;
       [nombre,albumNom,idAlbum,precio,estado]= key.split(",");
     
       //EL URL DE LA IMAGEN DE LA PORTADA

        
       if (String(nombre).toUpperCase() == buscando.toUpperCase() || String(albumNom).toUpperCase()==buscando.toUpperCase()) {
          if (estado!="B") {
            portadasImagenes[i]=portadasRegistradas[key];
          portadasMusico[i]=nombre;
          portadasNomAlbum[i]=albumNom;
          portadasIdAlbum[i]=idAlbum;
          portadasPrecio[i]=precio;
     
        
          i=i+1;
          }
       }
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
  playlist(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Playlist";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Playlist";
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
  categorias(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Categorias";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Categorias";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Categorias";
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
  discografia(){
    
    window.location.href="Inicio/Musico/Discografia";
  
}
publicar(){
  window.location.href="/Inicio/Musico/Publicar"
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
recomendaciones(){
  if (this.cookie.get("rol")=="normal") {
    window.location.href="/Inicio/Normal/Recomendaciones";
  }else if(this.cookie.get("rol")=="musico"){
    window.location.href="/Inicio/Musico/Recomendaciones";
  }else if(this.cookie.get("rol")=="administrador"){
    window.location.href="/Inicio/Administrador/Recomendaciones";
  }
}

  ngOnInit() {
  }

}
