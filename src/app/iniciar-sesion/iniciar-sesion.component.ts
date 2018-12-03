import { Component, OnInit } from '@angular/core';
import {ObtenerUsuarioNormalService} from '../servicios/obtener-usuario-normal.service'
import {ObtenerMusicoService} from '../servicios/obtener-musico.service'
import {ObtenerAdministradoresService} from '../servicios/obtener-administradores.service'

/*JQUERY */
import $ from 'jquery';
/*COOKIE */
import { CookieService } from 'ngx-cookie-service';
/*FIREBASE */
import * as firebase from 'firebase';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  usuariosNormales:any[]=[];
  usuariosMusicos:any[]=[];
  usuariosAdministradores:any[]=[];
  usuario:string;
  password:string;
  Normal:boolean=true;
  Musico:boolean=false;
  Administrador:boolean=false;
  constructor(
    private usuariosNormalesService:ObtenerUsuarioNormalService, 
    private usuariosMusicoService:ObtenerMusicoService,
    private usuariosAdministradoresService:ObtenerAdministradoresService,
    private cookie:CookieService
    ) { 
    /*Obteniendo el json de los usuarios normales*/
    this.usuariosNormalesService.getUsuarioNormal()
     .subscribe(usuariosNormales =>{
       for(let i in usuariosNormales){
         this.usuariosNormales[i]= usuariosNormales[i];
         
       }
     });
     /*Obteniendo el json de los musicos*/
     this.usuariosMusicoService.getMusico()
     .subscribe(usuarioMusico =>{
       for(let i in usuarioMusico){
         this.usuariosMusicos[i]= usuarioMusico[i];
         
       }
     });
     /*Obteniendo el json de los administradores */
     this.usuariosAdministradoresService.getAdmin()
     .subscribe(usuarioAdmin =>{
       for(let i in usuarioAdmin){
         this.usuariosAdministradores[i]= usuarioAdmin[i];
         console.log(this.usuariosAdministradores[i]);
       }
       
     });
     
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
  admin(){this.Administrador=true;this.Musico=false;this.Normal=false;}
  musico(){this.Musico=true;this.Administrador=false;this.Normal=false;}
  normal(){this.Normal=true;this.Musico=false;this.Administrador=false;}
  onSubmit(){
    /*CERRANDO SESION */
     firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    let correoElectronico:string=$('#correo').val();
    let pass:string=$('#password').val();
    var email = String(correoElectronico);
    var password = String(pass);
    this.usuario= $('#correo').val();
   this.password=$('#password').val();
   /*DETECTANDO EL TIPO DE USUARIO */
   /*FLAG ES USADA PARA OBTENER LA VARIABLE QUE INDICA EN QUE POSICION
   DEL ARREGLO ESTA EL USUARIO Y TENER SUS DATOS*/
   let flag;
   let entro:Boolean=false;
   if(this.Normal==true){
     /*SI SON USUARIOS NORMALES */
    for(let i in this.usuariosNormales){
      if((this.usuariosNormales[i].correoElectronico==this.usuario)&&(this.usuariosNormales[i].contraseña==this.password)){
        flag=i;
        entro=true;
      }
      
    }
    
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
      if (entro==true) {
        if (firebase.auth().currentUser==null) {
          console.log("NO SE LOGUEO");
         }else{
          console.log('SI SE LOGUEO');
          this.cookie.set('correo',correoElectronico);
          this.cookie.set('contraseña',password);
          this.cookie.set('nombre',this.usuariosNormales[flag].nombre);
          this.cookie.set('nombreCompleto',this.usuariosNormales[flag].nombreCompleto);
          this.cookie.set('rol','normal');
 
          window.location.href="/Inicio/Normal/";
     
         
         console.log(firebase.auth().currentUser);
         
       }
      }
  
   }else if(this.Musico==true){
     /*SI SON MUSICOS */
    for(let i in this.usuariosMusicos){
      if((this.usuariosMusicos[i].correoElectronico==this.usuario)&&(this.usuariosMusicos[i].contraseña==this.password)){
        flag=i;
        entro=true; 
      }
    }
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    if (entro==true) {
      if (firebase.auth().currentUser==null) {
        console.log("NO SE LOGUEO");
       }else{
        console.log('SI SE LOGUEO');
        this.cookie.set('correo',correoElectronico);
        this.cookie.set('contraseña',password);
        this.cookie.set('nombre',this.usuariosMusicos[flag].nombre);
        this.cookie.set('origen',this.usuariosMusicos[flag].origen);
        this.cookie.set('paginaWeb',this.usuariosMusicos[flag].paginaWeb);
        this.cookie.set('rol','musico');

        window.location.href="/Inicio/Musico/";
       console.log(firebase.auth().currentUser);
     }
    }
   }else if(this.Administrador==true){
    /*SI ES ADMIN */
    
    for(let i in this.usuariosAdministradores){
      if((this.usuariosAdministradores[i].correoElectronico==this.usuario)&&(this.usuariosAdministradores[i].contraseña==this.password)){
        flag=i;
        entro=true; 
      }
    }
    firebase.auth().signInWithEmailAndPassword(correoElectronico, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    if (entro==true) {
      
      if (firebase.auth().currentUser==null) {
        console.log("NO SE LOGUEO");
       }else{
        console.log('SI SE LOGUEO');
        this.cookie.set('correo',correoElectronico);
        this.cookie.set('contraseña',password);
        this.cookie.set('nombre',this.usuariosAdministradores[flag].nombre);
        this.cookie.set('rol','administrador');
        window.location.href="/Inicio/Administrador";
       console.log(firebase.auth().currentUser);
     }
   }
   
  }
  if (entro==false) {
    alert('Usuario no encontrado');
   }
}

}
