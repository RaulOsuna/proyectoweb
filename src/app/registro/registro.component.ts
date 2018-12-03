import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import $ from 'jquery';
import { AutenticationService } from '../servicios/autentication.service';
import * as firebase from 'firebase';
import {CookieService} from 'ngx-cookie-service';
import {ObtenerUsuarioNormalService} from '../servicios/obtener-usuario-normal.service'
import {ObtenerMusicoService} from '../servicios/obtener-musico.service';
class usuario {
  nombreCompleto : String;
  nombre:String;
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
  verificarExistencia:boolean=false;
  onSubmit(){
    
    let authService:AutenticationService;
    let registro=new usuario();
    /*PASANDOLOS A STRING */
    let nombreCompleto:string=$('#input-1').val();
    let nombre:string=$('#input-2').val();;
    let correoElectronico:string=$('#input-3').val();
    let contraseña:string=$('#input-4').val();
    alert(contraseña);
    let contraseña2:string=$('#input-5').val();
    
    /* */
    registro.nombreCompleto=nombreCompleto;
    registro.nombre=nombre;
    registro.correoElectronico=correoElectronico;
    registro.contraseña=contraseña;
    var email = String(correoElectronico);
    var password = String(contraseña);
    
    let verificarExistencia:Boolean=false; //verifica existencia usuario nombre
    let verificarExistenciaEmail:boolean=false; //verifica si existe el email
    if (String(contraseña).length>8 &&(String(contraseña).indexOf("1")||String(contraseña).indexOf("2")||String(contraseña).indexOf("3")||String(contraseña).indexOf("4")||String(contraseña).indexOf("5")||String(contraseña).indexOf("6")||String(contraseña).indexOf("7")||String(contraseña).indexOf("8")||String(contraseña).indexOf("9")||String(contraseña).indexOf("0"))) {
      if (nombreCompleto==""||nombre==""||correoElectronico==""||contraseña==""||contraseña2=="") {
        alert("Rellene todos los campos");
      }else{
        if (contraseña==contraseña2) {
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
            }else if(String(value.correoElectronico).toUpperCase()==email.toUpperCase()){
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
                }else if(String(value.correoElectronico).toUpperCase()==email.toUpperCase()){
                  verificarExistenciaEmail=true;
                }
              }
              if (verificarExistencia==false) {
                if (verificarExistenciaEmail==false) {
                  
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                  console.log(error.code);
                  console.log(error.message);
               });
                this.registroServicio.postRegistroNormal(registro)
                .subscribe(newpres=>{});
                
                alert("Registro completado");
                
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
      alert("La contraseña debe tener mas de 8 caracteres y al mennos 1 numero");
    }
    
    
    
    
    
  }
}
