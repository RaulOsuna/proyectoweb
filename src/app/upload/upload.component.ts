import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import $ from 'jquery';
import {RegistrarAlbumService} from '../servicios/registrar-album.service';
import { CookieService } from 'ngx-cookie-service';


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
  valueProgressBar=100;
  title = 'app';

  
  constructor(
    private storage: AngularFireStorage,
    private registrarAlbum:RegistrarAlbumService,
    private cookie:CookieService
    ) { }
    
  uploadFile(event) {
    
    for (let i = 0; i < 5; i++) { 
    
    let nombredelAlbum:string=$('#nombreAlbum').val();
    const file = event.target.files[0];
    //La linea de abajo falta obtener el id album que llevara
    const filePath = String('Portadas/'+this.cookie.get("nombre")+","+nombredelAlbum+",1");
    
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
        let nombre:String=this.cookie.get("nombre")+","+nombredelAlbum+","+1; 
        
        var rootRef = firebase.database().ref().child("Portadas").child(String(nombre)).set(ruta);
        this.registrarAlbum.postPortada(rootRef).subscribe(newpres=>{});
        this.paso2=true;
        
       });
      }
      for (let i = 0; i < 101; i++) { 
        this.valueProgressBar=i;
      }
      
    this.paso1=false;
    this.paso2=true;
    alert('PORTADA ELEGIDA SATISFACTORIAMENTE');
   
    
    
   
  }
  
  i:number=0;
  files;
  nombreCancion:String[]=[];
  ruta;
  correcto:boolean=true;
  mostrarPaso2:boolean=false;
  
  uploadFile2(event) {
    var files = $("#drag")[0].files;
    let nombredelAlbum:string=$('#nombreAlbum').val();
  
    for (var i = 0; i < files.length; i++)
    {
      let nombreCancion1:String=String(files[i].name);
      if(nombreCancion1.split(".").length - 1==2){
        alert('NINGUN ARCHIVO DE MUSICA DEBE TENER UN PUNTO EN SU NOMBRE EXCEPTUANDO EL DE SU EXTENSION');
        this.correcto=false;
        break;
      }
      [this.nombreCancion[i]]=String(files[0].name).split(".");
     
    }
    this.i=0;
    if(this.correcto==true){
      for (var i = 0; i < files.length; i++)
      {
        
        this.i=i;
        const filePath = "Canciones/"+this.cookie.get("nombre")+","+this.nombreCancion[this.i]+",1,"+this.i;
        let task = this.storage.upload(filePath, files[this.i]);
        let ruta:any;
        this.uploadPercent = task.percentageChanges();
        //Aqui se guarda
        let fileRef=this.storage.ref(filePath);
        this.files=this.nombreCancion[this.i];
        //AQUI ABAJO SE ALMACENA EN LA BD
        fileRef.getDownloadURL().subscribe(ref => {
          ruta=ref;
          var rootRef = firebase.database().ref().child("Canciones").child(this.nombreCancion[this.i]+","+nombredelAlbum+","+"ID"+this.i).set(ruta);
          this.registrarAlbum.postCancion(rootRef).subscribe(newpres=>{});
        });
        

      
      }
      
    }
    this.correcto=true;
    
  }
 
  onSubmit(){
    
  window.location.href="/Inicio/Musico";

    

  }
 

  

}
