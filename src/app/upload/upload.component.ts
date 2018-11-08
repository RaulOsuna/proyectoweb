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
  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  metadata:object;
  ImgExistencia:boolean=false;
  title = 'app';
  constructor(
    private storage: AngularFireStorage,
    private registrarAlbum:RegistrarAlbumService,
    private cookie:CookieService
    ) { }

  uploadFile(event) {
    
    let nombredelAlbum:string=$('#nombreAlbum').val();
    const file = event.target.files[0];
    //La linea de abajo falta obtener el id album que llevara
    const filePath = String('Portadas/demo1');
    alert(filePath);
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
     
     
      var rootRef = firebase.database().ref().child("Portadas").child(String(nombre)).set(String(ruta));

      this.registrarAlbum.postPortada(rootRef)
      .subscribe(newpres=>{
      
      });
  
     });
     
     
    this.ImgExistencia=true;
  }
  uploadFile2(event) {
    var files = $("#drag")[0].files;

    for (var i = 0; i < files.length; i++)
    {
    const filePath = "Canciones/"+String(i);
    
    const task = this.storage.upload(filePath, files[i]);
    // observe percentage changes
    
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    let fileRef=this.storage.ref(filePath);
    fileRef.getDownloadURL().subscribe(ref => {
      console.log('REF', ref)
      this.downloadURL = ref
     })
    }
    
  }
  onSubmit(){
    
  console.log();

    

  }
 

  

}
