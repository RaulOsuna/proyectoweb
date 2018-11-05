import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  ngOnInit() {
   
  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  title = 'app';
  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'demo126';
    const task = this.storage.upload(filePath, file);
    
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
