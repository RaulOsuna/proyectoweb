import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import $ from 'jquery';
import { AutenticationService } from '../servicios/autentication.service';
import * as firebase from 'firebase';


class usuario {
  nombreCompleto : String;
  nickname:String;
  correoElectronico:String;
  contraseña:string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  constructor(
    private pf:FormBuilder, 
    private registroServicio:RegistroNormalService,
    
    ) { 
    
  }
  
  ngOnInit() {
    firebase.initializeApp( {
      apiKey: "AIzaSyC4um45LsiQWemYv_Kpwppzq6BwF3AtHww",
      authDomain: "pulse-863f8.firebaseapp.com",
      databaseURL: "https://pulse-863f8.firebaseio.com",
      projectId: "pulse-863f8",
      storageBucket: "pulse-863f8.appspot.com",
      messagingSenderId: "997581533112"
    })
  }
  
  onSubmit(){
    
    let authService:AutenticationService;
    let registro=new usuario();
    /*PASANDOLOS A STRING */
    let nombreCompleto:string=$('#input-1').val();
    let nickname:string=$('#input-2').val();;
    let correoElectronico:string=$('#input-3').val();
    /* */
    registro.nombreCompleto=nombreCompleto;
    registro.nickname=nickname;
    registro.correoElectronico=correoElectronico;
    registro.contraseña=password;
    var email = String(correoElectronico);
    var password = String(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
    this.registroServicio.postRegistroNormal(registro)
    .subscribe(newpres=>{});
    window.location.href="/Inicio"
  }
}
