import { Component, OnInit } from '@angular/core';
import {ObtenerUsuarioNormalService} from '../servicios/obtener-usuario-normal.service'
import {ObtenerMusicoService} from '../servicios/obtener-musico.service'
import $ from 'jquery';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  usuariosNormales:any[]=[];
  usuariosMusicos:any[]=[];
  usuario:string;
  password:string;
  Normal:boolean=true;
  constructor(private usuariosNormalesService:ObtenerUsuarioNormalService, private usuariosMusicoService:ObtenerMusicoService) { 
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

  }
  
  ngOnInit() {
    
  }
  cambioTrue(){this.Normal=true;}
  cambioFalse(){this.Normal=false;}
  onSubmit(){
   this.usuario= $('#usuario').val();
   this.password=$('#password').val();
   if(this.Normal==true){
    for(let i in this.usuariosNormales){
      if((this.usuariosNormales[i].nickname==this.usuario)&&(this.usuariosNormales[i].contraseña==this.password)){
        alert('entro');
        window.location.href="/Inicio/Normal/"
      }
      
    }
   }else{
    for(let i in this.usuariosMusicos){
      if((this.usuariosMusicos[i].nombre==this.usuario)&&(this.usuariosMusicos[i].contraseña==this.password)){
        alert('entro');
        window.location.href="/Inicio/Musico/"
      }
      
    }
   }
  }

}
