import { Component, OnInit } from '@angular/core';
import {ObtenerPlaylistsService} from '../servicios/obtener-playlists.service'
import {CookieService} from 'ngx-cookie-service';
import $ from 'jquery';
class tracks{
  name:String;
  duration:String;
  url:String;
}
@Component({
  selector: 'app-playlist-seleccionado',
  templateUrl: './playlist-seleccionado.component.html',
  styleUrls: ['./playlist-seleccionado.component.css']
})
export class PlaylistSeleccionadoComponent implements OnInit {
  cancionActual;
  usuario=this.cookie.get("nombre");
  playlistKey:String[]=[];
  playlistsId:String[]=[];
  nombreCancion:String[]=[];
  nombrePlaylist:String[]=[];
  propietarioCancion:String[]=[];
  url:String[]=[];
  i=0;
  //----------------------------
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
    let idPlaylist=localStorage.getItem("playlistId");
    let i=0;
    let usuario=this.cookie.get("nombre");
    let playlistKey:String[]=[];
    let playlistsId:String[]=[];
    let nombreCancion:String[]=[];
    let nombrePlaylist:String[]=[];
    let propietarioCancion:String[]=[];
    let url:String[]=[];
    this.playlist.getPlaylists()
      .subscribe(playlistss =>{
        for (let [key, value] of Object.entries(playlistss)) {
          if (value.propietario==usuario) {
             if (value.idPlaylist==localStorage.getItem("playlistId")) {
              playlistKey[i]=key;
              
              playlistsId[i]=value.playlistsId;
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
          
          this.reproductor(this.nombreCancion[index],this.url[index]);
        }
        
        
      });
      
    }
    flag:boolean=false;
    reproductor(nombre,url){
     
     //Audio Player Class
    var AudioPlayer = function () {
    this._playlist = null;
    this._currentSongIndex = 0;
    
    this._getContainer = function () {
      if (this._$container == null) {
        this._$container = $('<div>');
        this._$container.addClass('container');
        this._$container.append(this._getAudio());
        this._$container.append(this._getList());
      } 
      return this._$container;
    };
    
    this._getAudio = function () {
  
      if (this._$audio == null) {
        this._$audio = $('<audio>');
        this._$audio.attr('preload', true);
        this._$audio.attr('controls', '');
        this._$audio.attr('controlslist','nodownload');
        this._$audio[0].src = this._playlist[this._currentSongIndex]['url'];
        this._$audio[0].addEventListener('ended', this._handleAudioEnded.bind(this));
      }
      return this._$audio;
    };
  
    this._getList = function () {
      if (this._$list == null) {
        this._$list = $('<ul>');
        this._$list.addClass('list');
        for (var i = 0; i < this._playlist.length; i++) {
          var currentAudioUrl = this._playlist[i],
            $listItem = $('<li>');
          $listItem.addClass('list-item');
          $listItem.attr('audio-url', currentAudioUrl.url);
          $listItem.on('click', this._handListItemClick.bind(this));
          $listItem.text(currentAudioUrl.name + ' - ' + currentAudioUrl.duration);
         this._$list.append($listItem);

        }
        this._$list.find('li').eq(this._currentSongIndex).addClass('active');
      }
      return this._$list;
    };
  
    this._handListItemClick = function (e) {
      var $this = $(e.currentTarget);
      this._currentSongIndex = $this.index();
      this._playAudioFromCurrentIndex();
    };
  
    this._handleAudioEnded = function (e) {
      this._currentSongIndex++;
      if (this._currentSongIndex == this._playlist.length) this._currentSongIndex = 0;    
      this._playAudioFromCurrentIndex();
    };
  
    this._playAudioFromCurrentIndex = function () {
    var $allListItems = this._getList().find('li'),
        $targetListItem = this._getList().find('li').eq(this._currentSongIndex),
        audioUrl =  $targetListItem.attr('audio-url');
      $allListItems.removeClass('active');
      $targetListItem.addClass('active');
      this._getAudio()[0].src = audioUrl;
      this._getAudio()[0].pause();
      this._getAudio()[0].load();

      this._getAudio()[0].play();
    };
    
    this.setPlaylist = function (playlist) {
      this._playlist = playlist;
    };
  
    this.getHtml = function () {
      return this._getContainer();
    };
  };

    //Declare playlist
    var trackUrls = [{
      'name': nombre,
      'duration': '6:26',
      'url': url
    }];

    //make a new player
    var audioPlayer = new AudioPlayer();
    audioPlayer.setPlaylist(trackUrls);

    //append the player
    $('.audio-player-container').append(audioPlayer.getHtml());
    }
  
    irInicio(){
      if (this.cookie.get("rol")=="normal") {
        window.location.href="/Inicio/Normal";
      }else{
        window.location.href="/Inicio/Musico";
      }
    }
    publicarAlbum(){
      window.location.href="/Inicio/Musico/Publicar";
    }
    discografia(){
      window.location.href="/Inicio/Musico/Discografia";
    }
    playlist1(){
      window.location.href="/Inicio/Musico/Playlist"  
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
    ngOnInit(){
     
    }
}

  

