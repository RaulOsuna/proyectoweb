import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder } from '@angular/forms';
import { RegistroMusicoService } from '../servicios/registro-musico.service';
import $ from 'jquery';
import * as firebase from 'firebase';
import {CookieService} from 'ngx-cookie-service';
import { ObtenerUsuarioNormalService } from '../servicios/obtener-usuario-normal.service';
import { ObtenerMusicoService } from '../servicios/obtener-musico.service';

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
    private obtenerUsuarioNormales:ObtenerUsuarioNormalService,
    private obtenerUsuarioMusicos:ObtenerMusicoService,
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
    let verificarExistencia:boolean=false;
    let verificarExistenciaEmail:boolean=false;
    if (String(contraseña).length>8 &&(String(contraseña).includes("1")||String(contraseña).includes("2")||String(contraseña).includes("3")||String(contraseña).includes("4")||String(contraseña).includes("5")||String(contraseña).includes("6")||String(contraseña).includes("7")||String(contraseña).includes("8")||String(contraseña).includes("9")||String(contraseña).includes("0"))) {
      if (nombre==""||origen==""||correoElectronico==""||contraseña==""|| confContraseña=="") {
        alert("Rellene todos los campos");
      }else{
        if (contraseña==confContraseña) {
          if (
            email.includes("@hotmail.com")||
            email.includes("@gmail.com") ||
            email.includes("@yahoo.com") ||
            email.includes("@outlook.com") ||
            email.includes("@live.com")
          ) {
             /*VERIFICA ACA LA EXISTENCIA DEL NOMBRE DE USUARIO O NICK */
        this.obtenerUsuarioNormales.getUsuarioNormal().subscribe(normal =>{
          for (let [key, value] of Object.entries(normal)) {
            if (String(value.nombre).toUpperCase()==nombre.toUpperCase()) {
              verificarExistencia=true;
            }else if(String(value.correoElectronico).toUpperCase()==correoElectronico.toUpperCase()){
              verificarExistenciaEmail=true;
            }
          }
          if (verificarExistencia==true) {
           alert("nombre no disponible");
          }else if(verificarExistenciaEmail==true){
            alert("El email ingresado ya ha sido utilizado");
          }else{
            
            this.obtenerUsuarioMusicos.getMusico().subscribe(musico =>{
              for (let [key, value] of Object.entries(musico)) {
                if (String(value.nombre).toUpperCase()==nombre.toUpperCase()) {
                  verificarExistencia=true;
                }else if(String(value.correoElectronico).toUpperCase()==correoElectronico.toUpperCase()){
                  verificarExistenciaEmail=true;
                }
              }
              
              if (verificarExistencia==false) {
                if (verificarExistenciaEmail==false) {
                  
                  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    console.log(error.code);
                    console.log(error.message);
                 });
                  this.registroServicio.postRegistroMusico(registro)
                  .subscribe(newpres=>{});
                  window.location.href="/Inicio";
                  alert("Musico registrado");
                
                }else{

                  alert("el email ingresado ya ha sido registrado");
                }
              }else{
                alert("nombre no disponible");
              }
            });
          } 
        });
          }else{
            alert("email invalido");
          }
        }else{
          alert("Las contraseñas no coinciden");
        }
       
      
      }
    }else{
      alert("La contraseña debe tener minimo 8 caracteres y al menos 1 numero");
    }
  }
}
/*
 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
    this.registroServicio.postRegistroNormal(registro)
    .subscribe(newpres=>{});
    alert("Musico registrado");
 */