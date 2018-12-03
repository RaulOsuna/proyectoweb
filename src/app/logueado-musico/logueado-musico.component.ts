import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ObtenerBalanceService} from '../servicios/obtener-balance.service';
import $ from 'jquery';
@Component({
  selector: 'app-logueado-musico',
  templateUrl: './logueado-musico.component.html',
  styleUrls: ['./logueado-musico.component.css']
})

export class LogueadoMusicoComponent implements OnInit {
  nombreMusico=this.cookie.get("nombre");
  balancez;
  constructor(
    private cookie:CookieService,
    private balance:ObtenerBalanceService,
  
  ) { 
    if (this.cookie.get("rol")!="musico") {
      window.location.href="/Inicio";
    }
    let venta=0;
    let i=0;
    let z=0;
    this.balance.getBalance().subscribe(balances=>{
      for (let [key, value] of Object.entries(balances)) {
        if (String(value.Artista).toUpperCase()==String(this.nombreMusico).toUpperCase()) {
          venta=venta+Number(value.Venta);
        }
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
  categorias(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Categorias";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Categorias";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Categorias";
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
  explorar(){

    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico/Explorar";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador/Explorar";
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
  publicarAlbum(){
    window.location.href="/Inicio/Musico/Publicar";
  }
  discografia(){
    window.location.href="/Inicio/Musico/Discografia";
  }
  
  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }

}
