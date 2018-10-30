import { Component, OnInit } from '@angular/core';
import {ObtenerUsuarioNormalService} from '../servicios/obtener-usuario-normal.service'
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  usuariosNormales:any[]=[];
  constructor(private usuariosNormalesService:ObtenerUsuarioNormalService) { 
    this.usuariosNormalesService.getUsuarioNormal()
     .subscribe(usuariosNormales =>{
       for(let i in usuariosNormales){
         this.usuariosNormales[i]= usuariosNormales[i];
         
       }
     })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.usuariosNormales);
  }

}
