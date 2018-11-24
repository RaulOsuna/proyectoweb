import { Component, OnInit } from '@angular/core';
import {$} from 'jquery';
import {ObtenerPlaylistsService} from '../servicios/obtener-playlists.service'
import {CookieService} from 'ngx-cookie-service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  usuarioActual=this.cookie.get("nombre");
  playlistKey:String[]=[];
  playlistsId:String[]=[];
  nombreCancion:String[]=[];
  nombrePlaylist:String[]=[];
  propietarioCancion:String[]=[];
  url:String[]=[];
  
  usuarioNormal:boolean=false;
  constructor(
    private playlist:ObtenerPlaylistsService,
    private cookie:CookieService,
  ) { 
    if (this.cookie.get("rol")!="normal" && this.cookie.get("rol")!="musico") {
      window.location.href="/Inicio";
    }
    if (this.cookie.get("rol")=="normal") {
      this.usuarioNormal=true;
    }
    let usuario=this.cookie.get("nombre");
    let playlistKey:String[]=[];
    let playlistsId:String[]=[];
    let sortedPlaylistId:String[]=[];
    let nombreCancion:String[]=[];
    let nombrePlaylist:String[]=[];
    let propietarioCancion:String[]=[];
    
    let i=0;
    let url:String[]=[];

    let json;
    
    this.playlist.getPlaylists()
      .subscribe(playlistss =>{
        json=JSON.stringify(playlistss);
        for (let [key, value] of Object.entries(playlistss)) {
          if (value.propietario==usuario) {
            if (playlistsId.includes(value.idPlaylist)) {
              //SI EL ID YA ESTA EN EL ARREGLO NO SE AGREGAS, SINO SI
            }else{
              playlistKey[i]=key;
              playlistsId[i]=value.idPlaylist;
              nombreCancion[i]=value.nombreCancion;
              nombrePlaylist[i]=value.nombrePlaylist;
              propietarioCancion[i]=value.propietarioCancion;
              url[i]=value.url;
              i=i+1;
            }
          }
        }
        
        for (let index = 0; index < playlistsId.length; index++) {
          this.playlistKey[index]=playlistKey[index];
          this.playlistsId[index]=playlistsId[index];
          this.nombreCancion[index]=nombreCancion[index];
          this.nombrePlaylist[index]=nombrePlaylist[index];
          this.propietarioCancion[index]=propietarioCancion[index];
          this.url[index]=url[index];
        }
        
        
      });
      
   
  }

  ngOnInit() {
  }
  publicarAlbum(){
    window.location.href="/Inicio/Musico/Publicar";
  }
  playlistButton(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist";
    }else{
      window.location.href="/Inicio/Musico/Playlist";
    }
  }
  explorarButton(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Explorar";
    }else{
      window.location.href="/Inicio/Musico/Explorar";
    }
  }
  discografia(){
    window.location.href="/Inicio/Musico/Discografia";
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
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal";
    }else{
      window.location.href="/Inicio/Musico";
    }
  }
  playlistSeleccionada(playlistsId){
    localStorage.setItem("playlistId",playlistsId);
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal/Playlist/Seleccionado";
    }else{
      window.location.href="/Inicio/Musico/Playlist/Seleccionado";
    }
    
  }

}
