import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
import {ObtenerBalancePagService} from '../servicios/obtener-balance-pag.service';
@Component({
  selector: 'app-logueado-administrador',
  templateUrl: './logueado-administrador.component.html',
  styleUrls: ['./logueado-administrador.component.css']
})
export class LogueadoAdministradorComponent implements OnInit {
  usuario=this.cookie.get("nombre");
  balancez=0;
  constructor(
    private cookie:CookieService,
    private balance:ObtenerBalancePagService,
  ) { 
    if (this.cookie.get("rol")!="administrador") {
      window.location.href="/Inicio";
    }
    let venta=0;
    let i=0;
    let z=0;
    this.balance.getBalancePulse().subscribe(balances=>{
      for (let [key, value] of Object.entries(balances)) {
          venta=venta+Number(value.Venta);
        
      }
      this.balancez=venta;
    });
  }

  ngOnInit() {
  }
  irInicio(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador";
    }
  }
  playlist(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Playlist";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Playlist";
    }
  }
  explorar(){

    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Explorar";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Explorar";
    }
    
  }
  recomendaciones(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Recomendaciones";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Recomendaciones";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Recomendaciones";
    }
  }
  categorias(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Categorias";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Categorias";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Categorias";
    }
  }
  admin(){
    if (this.cookie.get("rol")=="administrador") {
      window.location.href="Inicio/Administrador/Administracion";
    }
  }
  buscar(){
    let buscar:String=$("#buscarBox").val();
    if (buscar!="") {
      localStorage.setItem("buscar",String(buscar));
      if (this.cookie.get("rol")=="normal") {
        window.location.href="/Inicio/Normal/Busqueda";
      }else if(this.cookie.get("rol")=="administrador"){
        window.location.href="/Inicio/Administrador/Busqueda";
      }
    }else{
      alert("No ha ingresado un valor");
    }
  }
}
