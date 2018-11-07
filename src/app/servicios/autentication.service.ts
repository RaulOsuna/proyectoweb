import {AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
 
  authState: any = null;
 
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  registroUsuario(email,password){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch(error=>{
      console.log(error);
    })
  }
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}
