import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder } from '@angular/forms';
import { RegistroMusicoService } from '../servicios/registro-musico.service';
class usuario {
  nombre : String;
  origen:String;
  correoElectronico:String;
  contraseña:string;
  paginaWeb:string;
}
@Component({
  selector: 'app-registro-musico',
  templateUrl: './registro-musico.component.html',
  styleUrls: ['./registro-musico.component.css']
})

export class RegistroMusicoComponent implements OnInit {

  constructor(private registroServicio:RegistroMusicoService) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log('woo');
    let registro=new usuario();
    registro.nombre="pedro antonio";
    registro.origen="EUA";
    registro.correoElectronico="pedro@hotmail.com";
    registro.contraseña="aaa1";
    registro.paginaWeb="www.elDadoSeLaCome.com"
    this.registroServicio.postRegistroNormal(registro)
    .subscribe(newpres=>{})
  }

}
