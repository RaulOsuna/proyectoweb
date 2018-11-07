import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import $ from 'jquery';

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
  ImgExistencia:boolean=false;
  title = 'app';
  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'Portadas/demo126';
    const task = this.storage.upload(filePath, file);
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    let fileRef=this.storage.ref(filePath);
    fileRef.getDownloadURL().subscribe(ref => {
      console.log('REF', ref)
      this.downloadURL = ref
     })
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
 

  

}
