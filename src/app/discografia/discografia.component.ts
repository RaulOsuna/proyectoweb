import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment'
import { ObtenerPortadasService } from '../servicios/obtener-portadas.service';
import { EliminarAlbumService } from '../servicios/eliminar-album.service';
import {  AlbumesService } from '../servicios/albumes.service';
import { CookieService } from 'ngx-cookie-service';
import { EliminarCancionService } from '../servicios/eliminar-cancion.service';
import {RegistrarAlbumService} from '../servicios/registrar-album.service';
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import $ from 'jquery';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-discografia',
  templateUrl: './discografia.component.html',
  styleUrls: ['./discografia.component.css']
})
export class DiscografiaComponent implements OnInit {
  
  /*VARIABLE BOOLEANA PARA MOSTRAR EL SELECT DE CANCIONES */
  canciones:boolean=false;
  portadasImagenes:String[]=[]; //urls de imagen
  url;
  portadasMusico:String[]=[]; //nombre del musico o grupo
  portadasNomAlbum:String[]=[]; //Nombre del album
  portadasIdAlbum:String[]=[];//id del album
  portadasPrecio:String[]=[]; //precio del album
  portadasEstado:String[]=[];//estado activo o de baja segun el caso del album
  usuario=this.cookie.get("nombre"); //Nombre de usuario

  idAlbum:String[]=[]; //El id del album aqui
  idCancion:String[]=[]; // El id de la cancion aqui
  cancionesAlbumes:String[]=[]; //Las canciones del album aqui
  cancionesUrls:String[]=[]; //urls de las canciones
  genero:String[]=[];//contiene el genero de la cancion
  cancionActualSeleccionada; /*Contiene el valor actual del combobox de
  las canciones */
  albumActualSeleccionado; /*Contiene el valor actual del album
  seleccionado en el combobox */
  usuarioNormal:boolean=false;
  usuarioMusico:boolean=false;
  usuarioAdmin:boolean=false;
  constructor(
    private portadas:ObtenerPortadasService,
    private cancionesAlbum:AlbumesService,
    private cookie:CookieService,
    private eliminacion:EliminarCancionService,
    private registrarAlbum:RegistrarAlbumService,
    private storage: AngularFireStorage,
    private eliminacionAlbum:EliminarAlbumService,
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
  
    /*OBTENIENDO LOS ALBUMES */
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
     
      
       
        portadasImagenes[i]=portadasRegistradas[key];
        portadasMusico[i]=nombre;
        portadasNomAlbum[i]=albumNom;
        portadasIdAlbum[i]=idAlbum;
        portadasPrecio[i]=precio;
        portadasEstado[i]=estado;
        i=i+1;
       
       
       
       
     });
     let x=0;
     for (let i = 0; i < portadasImagenes.length; i++) {
      if (this.cookie.get("nombre")==portadasMusico[i]) {
        
        this.portadasImagenes[i]=portadasImagenes[i];
        this.portadasMusico[i]=portadasMusico[i];
        this.portadasNomAlbum[i]=portadasNomAlbum[i];
        this.portadasIdAlbum[i]=portadasIdAlbum[i];
        this.portadasPrecio[i]=portadasPrecio[i];
        this.portadasEstado[i]=portadasEstado[i];
        x=x+1;

      }
      
    }
    });
    
    
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
  recomendaciones(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Recomendaciones";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Recomendaciones";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Recomendaciones";
    }
  }

  dropDown(event){
    this.albumActualSeleccionado=event;
   /*LIMPIANDO ARRAYS */
   for (let index = 0; index < this.cancionesAlbumes.length; index++) {
      
    
      this.cancionesUrls[index]=null;
      this.idAlbum[index]=null;
      this.idCancion[index]=null;
      this.cancionesAlbumes[index]=null;
      this.genero[index]=null;
    
    
  }

   let albumSeleccionado=event;
   let idDelAlbum; /*
   nombre del album seleccionado en el combobox*/
    /*OBTENIENDO EL ID  DEL ALBUM SELECCIONADO */
    for (let index = 0; index < this.portadasNomAlbum.length; index++) {
      if (this.portadasNomAlbum[index]==albumSeleccionado) {
        idDelAlbum=this.portadasIdAlbum[index];
        this.url=this.portadasImagenes[index];
        break;
      } 
    }





   /*OBTENIENDO LAS CANCIONES */
   this.cancionesAlbum.getTodasLasCanciones()
   .subscribe(cancionesEnAlbum =>{
    let i=0;
    let urlCancion:String[]=[];
    let nombreUsuario1:String[]=[];
    let nomCancion1:String[]=[];
    let idAlbum1:String[]=[];
    let idCancion1:String[]=[];
    let genero1:String[]=[];
    let x=0;
    Object.keys(cancionesEnAlbum).forEach(function(key) {
      //alert(key + ': ' + portadasRegistradas[key]);
      
      let nombre,nombreCancion,idAlbum,genero,idCancion:any;
      [nombre,nombreCancion,idAlbum,genero,idCancion]= key.split(",");
       
       
        
          urlCancion[i]=cancionesEnAlbum[key];
          nombreUsuario1[i]=nombre;
          nomCancion1[i]=nombreCancion;
          idAlbum1[i]=idAlbum;
          idCancion1[i]=idCancion;
          genero1[i]=genero;
          i=i+1;
        
       

    });
    
    for (let index = 0; index < nomCancion1.length; index++) {
      
      if (idAlbum1[index]!=null) {
        if (idAlbum1[index]==idDelAlbum && nombreUsuario1[index]==this.usuario) {
          this.cancionesUrls[x]=urlCancion[index] //aqui obtengo las urls
          this.idAlbum[x]=idAlbum1[index];
          this.idCancion[x]=idCancion1[index];
          this.cancionesAlbumes[x]=nomCancion1[index];
          this.genero[x]= genero1[index];
          x=x+1;
        }
      }
      
    }
    
    
    
   });
    
  }
  
  cancionCambio(event){
    this.cancionActualSeleccionada=event;
  }
  eliminar(){
    let idDelAlbum;
    let idDeCancion;
    let urlCancion;
    let generoDarchivo;
    for (let index = 0; index < this.cancionesAlbumes.length; index++) {
        if (this.cancionesAlbumes[index]==this.cancionActualSeleccionada) {
          idDelAlbum=this.idAlbum[index];
          idDeCancion=this.idCancion[index];
          generoDarchivo=this.genero[index];
          break;
        }
      
    }


    /*cadenaEliminacion contiene el nombre del archivo a eliminar */
    let cadenaEliminacion=this.cookie.get("nombre")+","+this.cancionActualSeleccionada+","+idDelAlbum+","+generoDarchivo+","+idDeCancion;
    alert(cadenaEliminacion);
    this.eliminacion.delCancion(cadenaEliminacion).subscribe();
    alert("Cancion Eliminada con exito");
    window.location.href="/Inicio/Musico/Discografia";
    
  }
  nuevoNombreCancion(){
    let idDelAlbum;
    let idDeCancion;
    let urlCancion;
    let generoDcancion;
    let nuevoNombre= $("#nuevoNombreTXT").val();
    for (let index = 0; index < this.cancionesAlbumes.length; index++) {
        if (this.cancionesAlbumes[index]==this.cancionActualSeleccionada) {
          urlCancion=this.cancionesUrls[index];
          idDelAlbum=this.idAlbum[index];
          idDeCancion=this.idCancion[index];
          generoDcancion=this.genero[index];
          break;
        }
      
    }

    /*Cadena que se eliminara para luego insertar de nuevo con el nombre adecueado */
    
    /*AQUI ELIMINO LA CADENA */
    let cadenaEliminacion=this.cookie.get("nombre")+","+this.cancionActualSeleccionada+","+idDelAlbum+","+generoDcancion+","+idDeCancion;
    this.eliminacion.delCancion(cadenaEliminacion).subscribe();
    /*ACA LA INSERTO CON EL NUEVO NOMBRE */
      
      let nuevoNombrePoner=this.cookie.get("nombre")+","+nuevoNombre+","+idDelAlbum+","+generoDcancion+","+idDeCancion;
      alert(nuevoNombrePoner);
      const filePath = String('Canciones/'+nuevoNombrePoner);
      let fileRef=this.storage.ref(filePath);
      var rootRef = firebase.database().ref().child("Canciones").child(String(nuevoNombrePoner)).set(urlCancion);
      this.registrarAlbum.postCancion(rootRef).subscribe(newpres=>{});
      alert("Cambio hecho correctamente");
    
  }

  nuevoNombreAlbum(){
    //Nombre nuevo que se le pondra
    let nuevoNombreAlbum= $("#nuevoNombreAlbum").val();
    /*obteniendo el id del album
      obteniendo el precio 
      el nombre del usuario se tiene en cookies
      ya se obtuvo el nombre del nuevo album
    */
    let idAlbum;
    let precio;
    let url;
    let estado;
    /*Aqui obtengo el la informacion del album */
    for (let index = 0; index < this.portadasNomAlbum.length; index++) {
      if (this.portadasNomAlbum[index]==this.albumActualSeleccionado) {
        idAlbum=this.portadasIdAlbum[index];
        precio=this.portadasPrecio[index];
        url=this.portadasImagenes[index];
        estado=this.portadasEstado[index];
      }
    }
    
    //cadenaEliminar es el nombre que se va a quitar
    let cadenaEliminar=this.cookie.get("nombre")+","+this.albumActualSeleccionado+","+idAlbum+","+precio+","+estado;
    alert(cadenaEliminar);
    //cadenaPoner es el nuevo nombre
    let cadenaPoner=this.cookie.get("nombre")+","+nuevoNombreAlbum+","+idAlbum+","+precio+","+estado;
    alert(cadenaPoner);

    //Eliminando el antiguo nombre
    this.eliminacionAlbum.delAlbum(cadenaEliminar).subscribe();
    //Poniendo el nuevo nombre
    const filePath = String('Portadas/'+cadenaPoner);
    let fileRef=this.storage.ref(filePath);
    var rootRef = firebase.database().ref().child("Portadas").child(String(cadenaPoner)).set(url);
    this.registrarAlbum.postPortada(rootRef).subscribe(newpres=>{});
    alert("Cambio hecho correctamente");
  }





  /*Variables usadas en UploadFile */
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  files;

  /*VARIABLE USADA PARA VALIDAR */
  correcto:boolean=true;
  uploadFile(event){
    //obteniendo el archivo de musica
    const file=event.target.files[0];
    var genero:String=$('#generoBox option:selected').text();
    if (genero!="Seleccione genero") {
      /*nombreMusicaSubir contiene el nombre con el que se subira el
    archivo*/
    let nombreMusicaSubir=file.name;
    if(nombreMusicaSubir.split(".").length - 1==2){
      alert('NINGUN ARCHIVO DE MUSICA DEBE TENER UN PUNTO EN SU NOMBRE EXCEPTUANDO EL DE SU EXTENSION');
      this.correcto=false;
      
    }
    if (this.correcto==true) {
      let idMusica=1; //representa el id que tendra la nueva musica
    let idAlbum=1;//representa el id del album donde se insertara

    [nombreMusicaSubir]=(file.name).split(".");
    //en el Ciclo for se obtiene el ID DEL ALBUM
   
    for (let index = 0; index < this.idAlbum.length; index++) {
      if (Number(this.idAlbum[index])>idAlbum) {
        idAlbum=Number(this.idAlbum[index]);
      }
      
    }
    //En este ciclo fro se obtiene el ID mas grande de la cancion del album
    for (let index = 0; index < this.idCancion.length; index++) {
      if (Number(this.idCancion[index])>idMusica) {
        idMusica=Number(this.idCancion[index]);
      }
      
    }
    //se le suma uno porque obtuvo el mas grande registrado y para ser
    //nuevo se requiere sumarle 1
    idMusica=idMusica+1;
    let nombreCadena=this.cookie.get("nombre")+","+nombreMusicaSubir+","+idAlbum+","+genero+","+idMusica;
    //Subiendo Cancion
     
        
     const filePath = "Canciones/"+nombreCadena;
     
     let task = this.storage.upload(filePath, file);
     let ruta:any;
     this.uploadPercent = task.percentageChanges();
     //Aqui se guarda
     let fileRef=this.storage.ref(filePath);
     this.files=nombreMusicaSubir;
     //AQUI ABAJO SE ALMACENA EN LA BD
     
     setTimeout(() => 
     {
       
       fileRef.getDownloadURL().subscribe(ref => {
         ruta=ref;
         
         var rootRef = firebase.database().ref().child("Canciones").child(nombreCadena).set(ruta);
         
         this.registrarAlbum.postCancion(rootRef).subscribe(newpres=>{});
         
         alert('Cancion Agregada Satisfactoriamente');
         
       });
     },
     20000);
     
    }
    this.correcto=true;
    }
  }
  discografia(){
    
    window.location.href="Inicio/Musico/Discografia";
  
}
publicar(){
  window.location.href="/Inicio/Musico/Publicar"
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
