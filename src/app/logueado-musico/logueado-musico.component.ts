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
    let venta=0;
    let i=0;
    let z=0;
    this.balance.getBalance().subscribe(balances=>{
      for (let [key, value] of Object.entries(balances)) {
        if (value.Usuario==this.nombreMusico) {
          venta=venta+Number(value.Venta);
        }
      }
      this.balancez=venta;
    });
  }

  ngOnInit() {
    
  }
  
  buscar(){
    let buscar:String=$("#buscarBox").val();
    if (buscar!="") {
      localStorage.setItem("buscar",String(buscar));
      if (this.cookie.get("rol")=="normal") {
        window.location.href="/Inicio/Normal/Busqueda";
      }else{
        window.location.href="/Inicio/Musico/Busqueda";
      }
    }else{
      alert("No ha ingresado un valor");
    }
  }
  irInicio(){
    window.location.href="/Inicio/Musico";
  }
  publicarAlbum(){
    window.location.href="/Inicio/Musico/Publicar";
  }
  discografia(){
    window.location.href="/Inicio/Musico/Discografia";
  }
  playlist(){
    window.location.href="/Inicio/Musico/Playlist"  
  }
  salir(){
    
    this.cookie.deleteAll("/");
    
    
      window.location.href="/Inicio";
    
    
  }

}
