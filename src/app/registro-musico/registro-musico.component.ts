import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder } from '@angular/forms';
import { RegistroMusicoService } from '../servicios/registro-musico.service';
import $ from 'jquery';
import * as firebase from 'firebase';
import {CookieService} from 'ngx-cookie-service';
class usuario {
  nombre : String;
  origen:String;
  correoElectronico:String;
  contraseña:String;
  paginaWeb:String;
}
@Component({
  selector: 'app-registro-musico',
  templateUrl: './registro-musico.component.html',
  styleUrls: ['./registro-musico.component.css']
})

export class RegistroMusicoComponent implements OnInit {

  constructor(
    private registroServicio:RegistroMusicoService,
    private cookie:CookieService,
    ) { 
      if (this.cookie.get("nombre")!="") {
        if (this.cookie.get("rol")=="normal") {
          window.location.href="/Inicio/Normal";
        }else{
          window.location.href="/Inicio/Musico";
        }
      }
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
    let nombre:String=$('#input-1').val();
    let origen:String=$('#input-2').val();
    let correoElectronico:String=$('#input-3').val();
    let contraseña:String=$('#input-4').val();
    let confContraseña:String=$('#input-5').val();
    let paginaWeb:String=$('#input-6').val();

    let registro=new usuario();
    registro.nombre=nombre;
    registro.origen=origen;
    registro.correoElectronico=correoElectronico;
    registro.contraseña=contraseña;
    registro.paginaWeb=paginaWeb;
    var email = String(correoElectronico);
    var password = String(contraseña);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
    this.registroServicio.postRegistroNormal(registro)
    .subscribe(newpres=>{});
    alert("Musico registrado");
  }
  
}
