import { Component, OnInit } from '@angular/core';
import {RegistroNormalService} from '../../app/servicios/registro-normal.service';
import { FormBuilder } from '@angular/forms';
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

  constructor(private pf:FormBuilder, private registroServicio:RegistroNormalService) { 
    
  }
  
  ngOnInit() {
    
  }
  woo(){
    console.log('ssss');
  }
  onSubmit(){
    console.log('woo');
    let registro=new usuario();
    registro.nombreCompleto="michelle";
    registro.nickname="michi";
    registro.correoElectronico="asdsd@hotmail.com";
    registro.contraseña="aaa1"
    this.registroServicio.postRegistroNormal(registro)
    .subscribe(newpres=>{})
  }
}
