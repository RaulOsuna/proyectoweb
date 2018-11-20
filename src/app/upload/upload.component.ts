import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import $ from 'jquery';
import {RegistrarAlbumService} from '../servicios/registrar-album.service';
import { CookieService } from 'ngx-cookie-service';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  ngOnInit() {
    $(document).ready(function(){
      $('form input').change(function () {
        $('form p').text(this.files.length + " file(s) selected");
      });
      
    });
    //---
    
  }
  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  metadata:object;
  ImgExistencia:boolean=false;
  uploadState: Observable<string>;
  paso1:boolean=true;
  paso2:boolean=false;
 //--------------------
  idAlbumOriginalGlobal:string;

 //--------------------
  title = 'app';

  
  constructor(
    private storage: AngularFireStorage,
    private registrarAlbum:RegistrarAlbumService,
    private cookie:CookieService,
    private portada:ObtenerPortadasService,
    ) {}
    
  uploadFile(event) {
    /*
    Guarda el nombre de usuario de la cookie por que no se puede usar
    en el for each 
    */
   //--------------------------------------------
   let nombreDelUsuario=this.cookie.get("nombre");
   let precioCancion=$('#precio').val();
   let idAlbumOriginalArray:String[]=[];
   let i=0;
   //---------------------------------------------
   let idAlbumOriginal=0;

   this.portada.getPortada()
    .subscribe(portadasRegistradas =>{
     Object.keys(portadasRegistradas).forEach(function(key) {
       let flag:boolean=false;
       //alert(key + ': ' + portadasRegistradas[key]);
       
       let nombre,albumNom,idAlbum:String;
       
       [nombre,albumNom,idAlbum]= key.split(",");
       /*
       Compara si el nombre del usuario es igual al del dato
       sacado del json
       */
      
       if(nombreDelUsuario==nombre){
          idAlbumOriginalArray[i]=idAlbum;
          i=i+1;
         }  
       }
       
     );
     for (let index = 0; index < idAlbumOriginalArray.length; index++) {
       if (Number(idAlbumOriginalArray[index])>idAlbumOriginal) {
         idAlbumOriginal=Number(idAlbumOriginalArray[index])
       }
       
     }
     /*
     Aqui se obtiene el valor del album que debe ir en la BD
     se le sumo +1 al ultimo album que registro
     */
     idAlbumOriginal=idAlbumOriginal+1;
     this.idAlbumOriginalGlobal=String(idAlbumOriginal);
     /* ---------------------------------------------------------------
    Ciclo for donde el valor es 5 para dar tiempo a ingresar a la foto
    */
 
    for (let i = 0; i < 5; i++) { 
    
      let nombredelAlbum:string=$('#nombreAlbum').val();
      const file = event.target.files[0];
      //La linea de abajo falta obtener el id album que llevara
      const filePath = String('Portadas/'+this.cookie.get("nombre")+","+nombredelAlbum+","+idAlbumOriginal+","+precioCancion);
      
      const task = this.storage.upload(filePath, file);
      
      
      let ruta:any;
      this.uploadPercent = task.percentageChanges();
      
      
      /*AQUI SE GUARDA LA IMG */
        
        
        let fileRef=this.storage.ref(filePath);
        
        fileRef.getDownloadURL().subscribe(ref => {
          
          this.downloadURL = ref;
          /*RUTA TIENE LA RUTA PARA ACCEDER AL ARCHIVO */
          ruta=ref;
          
          /*AQUI SE AGREGA A LA BD LA EXISTENCIA DEL IMG CON SU LINK y falta el id album */
       
          //La linea de abajo falta obtener el id album que llevara
          
          let nombre:String=this.cookie.get("nombre")+","+nombredelAlbum+","+idAlbumOriginal+","+precioCancion; 
          
          var rootRef = firebase.database().ref().child("Portadas").child(String(nombre)).set(ruta);
          this.registrarAlbum.postPortada(rootRef).subscribe(newpres=>{});
          this.paso2=true;
          
         });
        }
        
        
      this.paso1=false;
      this.paso2=true;
      alert('PORTADA ELEGIDA SATISFACTORIAMENTE');
    });
    
   
    
    
   
  }
  
  i=1;
  files;
  nombreCancion:String[]=[];
  ruta;
  correcto:boolean=true;
  mostrarPaso2:boolean=false;
  uploaded:boolean=false;

  //----
  albumNombre:String;
  albumOriginal:any;
  //----
  uploadFile2(event) {
    
    var files = $("#drag")[0].files;

    this.albumNombre=$('#nombreAlbum').val();
    
    //--------------------------------------
    let idAlbumOriginal=1;
    let nombreDelUsuario=this.cookie.get("nombre");
    this.portada.getPortada()
     .subscribe(portadasRegistradas =>{
      Object.keys(portadasRegistradas).forEach(function(key) {
        let flag:boolean=false;
        //alert(key + ': ' + portadasRegistradas[key]);
        
        let nombre,albumNom,idAlbum:String;
        
        [nombre,albumNom,idAlbum]= key.split(",");
        /*
        Compara si el nombre del usuario es igual al del dato
        sacado del json
        */
        
        if(nombreDelUsuario==nombre){
          /*
          Si el idAlbum sacado del json es menor al idAlbumOriginal
          que se le asigne ese: es decir obtener el numero del album
          mas grande, si no tiene album sera 0
          */
          if(idAlbumOriginal<Number(idAlbum)){
            idAlbumOriginal=Number(idAlbum);
            
            flag=true;
          }
        
          } 
          
        }
        
      );
      
      /*
      Aqui se obtiene el valor del album que debe ir en la BD
      aqui no se le sumo +1 como en la parte de portadas por que
      para cuando llega aqui eso quiere decir que ya subio su album
      */
     
    
      //Se obtiene el nombre de la cancion
      let nombreCancion1:String=String(files[0].name);
      /*
      si el nombre del archivo contiene 2 puntos en su nombre
      por ej: dum.b.mp3 es rechazada, solo se permite 1, el de la
      extension
      */
      if(nombreCancion1.split(".").length - 1==2){
        alert('NINGUN ARCHIVO DE MUSICA DEBE TENER UN PUNTO EN SU NOMBRE EXCEPTUANDO EL DE SU EXTENSION');
        this.correcto=false;
        
      }
      /*
      Si esta correcto todo se obtiene el nombre de la cancion sin el
      .mp3 o mas bien sin su extension y activa la booleana
      */
     [this.nombreCancion[0]]=String(files[0].name).split(".");
    
    
    //Si la booleana esta activada entra
    if(this.correcto==true){
  
      
        /*OBTENIENDO EL IDALBUM */
        
        alert('cadena: '+this.cookie.get("nombre")+","+this.nombreCancion[0]+","+idAlbumOriginal+","+this.i);
        const filePath = "Canciones/"+this.cookie.get("nombre")+","+this.nombreCancion[0]+","+idAlbumOriginal+","+this.i;
        
        let task = this.storage.upload(filePath, files[0]);
        let ruta:any;
        this.uploadPercent = task.percentageChanges();
        //Aqui se guarda
        let fileRef=this.storage.ref(filePath);
        this.files=this.nombreCancion[this.i];
        //AQUI ABAJO SE ALMACENA EN LA BD
        
        setTimeout(() => 
        {
          
          fileRef.getDownloadURL().subscribe(ref => {
            ruta=ref;
            
            var rootRef = firebase.database().ref().child("Canciones").child(this.cookie.get("nombre")+","+this.nombreCancion[0]+","+idAlbumOriginal+","+this.i).set(ruta);
            
            this.registrarAlbum.postCancion(rootRef).subscribe(newpres=>{});
            
            alert('Cancion Agregada Satisfactoriamente');
            this.i=this.i+1;
          });
        },28000);
        
        
        

      
      
      
    }

    this.correcto=true;
      
     });
    //--------------------------------------
    
    
  }
  portadasRegistradas:any[]=[];
 
  
     
     

  
  
  
  

}
