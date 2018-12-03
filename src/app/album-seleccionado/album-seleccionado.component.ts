import { Component, OnInit, Input } from '@angular/core';
import {AlbumesService} from '../servicios/albumes.service';
import {ObtenerPortadasService} from '../servicios/obtener-portadas.service'
import { CookieService } from 'ngx-cookie-service';
import { Routes} from '@angular/router';
import $ from 'jquery';
import convertDataURIToBinary from 'jquery';
import {ObtenerBalanceService} from '../servicios/obtener-balance.service';
import {RegistrarBalanceService} from '../servicios/registrar-balance.service';
import {ObtenerPlaylistsService} from '../servicios/obtener-playlists.service';
import {RegistrarAlbumService} from '../servicios/registrar-album.service';
import {EliminarAlbumService} from '../servicios/eliminar-album.service';
import {RegistroMusicoService} from '../servicios/registro-musico.service';
import {RegistrarPlaylistService} from '../servicios/registrar-playlist.service';
/*ratings */
import {RegistrarRatingsService} from '../servicios/registrar-ratings.service';
import {RegistrarCompartidosService} from '../servicios/registrar-compartidos.service';

/*PAYPAL */
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import * as firebase from 'firebase';
/*Registro balance pulse */
import {RegistrarBalancePagService} from '../servicios/registrar-balance-pag.service';
import { saveAs } from 'file-saver';
class balanceClass {
  Usuario : String;
  Venta:String;
  Album:String;
  Artista:String;
}
class compartidos{
  urlCancion:String;
  urlPortada:String;
  nomCancion:String;
  nomAlbum:String;
  nomMusico:String;
  comentario:String;
  publicador:String;
}
class rating{
  cancion:string;
  estrellas:string;
  nombreAlbum:string;
  propietarioAlbum:string;
  usuario:string;
}
class registroPlaylist{
  idPlaylist:String;
  nombreCancion:String;
  nombrePlaylist:String;
  propietario:String;
  propietarioCancion:String;
  url:String;
}
@Component({
  selector: 'app-album-seleccionado',
  templateUrl: './album-seleccionado.component.html',
  styleUrls: ['./album-seleccionado.component.css']
})
export class AlbumSeleccionadoComponent implements OnInit {
  usuario=this.cookie.get("nombre");
  cancionesDB:any[]=[]; //Aqui se guardan las canciones
  musicaNombre:any[]=[]; //aqui el nombre de las canciones
  urlPortada=localStorage.getItem("portadasImagenes"); //url de portada
  nombreMusico=localStorage.getItem("portada"); //nombre del musico
  nombreAlbum=localStorage.getItem("nombre"); //nombre del album
  precioAlbum;
   /*paypal */
   public payPalConfig?: PayPalConfig;
   /*PLAYLIST DATOS */
   playlistKey:String[]=[];
    playlistsId:String[]=[];
    nombreCancion:String[]=[];
    nombrePlaylist:String[]=[];
    propietarioCancion:String[]=[];
    url:String[]=[];
    usuarioNormal: boolean=false;
    usuarioMusico:boolean=false;
    usuarioAdmin:boolean=false;
    estado:boolean=false;
  constructor( 
    private album:AlbumesService,
    private cookie:CookieService,
    private portada:ObtenerPortadasService,
    private balance1:ObtenerBalanceService,
    private regisBalance:RegistrarBalanceService,
    private obtPlaylist:ObtenerPlaylistsService,
    private regPlaylist:RegistrarPlaylistService,
    private regAlbum:RegistrarAlbumService,
    private EliAlbum:EliminarAlbumService,
    private regRating:RegistrarRatingsService,
    private regCompartidos:RegistrarCompartidosService,
    private regBalancePulse:RegistrarBalancePagService,

  ) { 
    if (this.cookie.get("rol")!="normal" && this.cookie.get("rol")!="musico" && this.cookie.get("rol")!="administrador") {
      window.location.href="/Inicio";
    }
    if (this.cookie.get("rol")=="normal") {
      this.usuarioNormal=true;
    }else if (this.cookie.get("rol")=="musico") {
      this.usuarioMusico=true;
    }else if (this.cookie.get("rol")=="administrador") {
      this.usuarioAdmin=true;
    }
    
    if (localStorage.getItem("portadasEstado")=="B") {
      this.estado=false;
    }else{
      this.estado=true;
    }
   /*AQUI SE OBTIENEN LAS CANCIONES DEL ALBUM */
   this.album.getTodasLasCanciones()
      .subscribe(musicas =>{
        let i=0;
        let canciones:any[]=[];
        let nombreCancion:any[]=[];
        Object.keys(musicas).forEach(function(key) {
          
          let nombre1,cancionNom,idAlbum1:string;
          [nombre1,cancionNom,idAlbum1]= key.split(",");
          
          // console.log(key);//esto obtiene el nombre del key
         // console.log(musicas[key]);//este el valor del key
        
          if ((nombre1==localStorage.getItem("portada"))&&(idAlbum1==localStorage.getItem("idAlbum"))) {
            
            canciones[i] = musicas[key];
            nombreCancion[i]=cancionNom;
            i=i+1;
          }
          
        });
        for (let x = 0; x < canciones.length; x++) {
          this.cancionesDB[x]=canciones[x];
          this.musicaNombre[x]=nombreCancion[x];

        }
      });
      /*AQUI SE OBTIENE EL PRECIO DEL ALBUM */
      let precio2;
      this.portada.getPortada()
      .subscribe(portadas =>{
        let precio1:String;
        let i=0;
        let nombre1,nomAlbum,idAlbum,precio:string;
        Object.keys(portadas).forEach(function(key) {
          
          [nombre1,nomAlbum,idAlbum,precio]= key.split(",");
          if ((nombre1==localStorage.getItem("portada"))&&(idAlbum==localStorage.getItem("idAlbum"))) {
            precio1= precio;
          }
          i=i+1;
        });
        this.precioAlbum=precio1;
        localStorage.setItem("precioAlbum",String(precio1));
      });
      /*AQUI OBTENGO LAS PLAYLIST DEL USUARIO LOGUEADO ACTUALMENTE */
      let i=0;
      let usuario=this.cookie.get("nombre");
      let playlistKey:String[]=[];
      let idPlaylists:String[]=[];
      let nombreCancion:String[]=[];
      let nombrePlaylist:String[]=[];
      let propietarioCancion:String[]=[];
      let url:String[]=[];
      this.obtPlaylist.getPlaylists()
        .subscribe(playlistss=>{
          for (let [key, value] of Object.entries(playlistss)) {
            if (value.propietario==usuario) {
              
              if (idPlaylists.includes(value.idPlaylist)) {

              }else{
                playlistKey[i]=key;
                idPlaylists[i]=value.idPlaylist;
                nombreCancion[i]=value.nombreCancion;
                nombrePlaylist[i]=value.nombrePlaylist;
                propietarioCancion[i]=value.propietarioCancion;
                url[i]=value.url;
                i=i+1;
              }
            }
          }
          /*Utilizo ciclo anidado para comprobar si el ID de la playlist
        ya se ha insertado por que sino aparece doble en el html
        asi verifico que por ID se ingrese una sola playlist
        la boolean se activa si ya existe esa playlist en el arreglo
         */
          for (let index = 0; index < nombreCancion.length; index++) {
            this.playlistsId[index]=idPlaylists[index];
            this.playlistKey[index]=playlistKey[index];
            this.nombreCancion[index]=nombreCancion[index];
            this.nombrePlaylist[index]=nombrePlaylist[index];
            this.propietarioCancion[index]=propietarioCancion[index];
            this.url[index]=url[index];
          }
       
        });
    
  }
  salir(){
    this.cookie.deleteAll("/");
    window.location.href="/Inicio"; 
  }
  
  discografia(){
    
      window.location.href="Inicio/Musico/Discografia";
    
  }
  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'asd',
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
        //AQUI SIMULO LO DE PAYPAL
        
        let balanceObj=new balanceClass();
        let usuario:String=this.cookie.get("nombre");
        let venta:String=localStorage.getItem("precioAlbum");
        let comision=0;
        
        
        if (Number(venta)>=1000) {
          comision=2.95/100;
        }else if (Number(venta)>=500 && Number(venta)<=999.999) {
          comision=3.15/100;
        }else if (Number(venta)>=250 && Number(venta)<=499.999) {
          comision=3.45/100;
        }else if(Number(venta)>=50 && Number(venta)<=249.999){
          comision=3.65/100;
        }else{
          comision=3.85/100;
        }
        let restar=Number(venta)*comision;
        //Hasta aqui se quito la comision de paypal
        venta=String(Number(venta)-restar);
        alert('1 '+venta);
        //Aqui se quitara la comision de la pagina
        comision=12/100;
        restar=Number(venta)*comision; //contiene la ganancia de la pag
        venta=String(Number(venta)-restar); //lo que gano el autor
        //--------------------------------------
        balanceObj.Usuario=usuario; //quien compro
        balanceObj.Venta=venta; //cuanto gano
        balanceObj.Album=localStorage.getItem("nombre"); //que album
        balanceObj.Artista=localStorage.getItem("portada");//a que artista
        this.regisBalance.postBalance(balanceObj).subscribe();
        //---------------------------------------------------------
        let balancePagina=new balanceClass();
        balancePagina.Album=localStorage.getItem("nombre");
        balancePagina.Artista=localStorage.getItem("portada");
        balancePagina.Usuario=usuario;
        balancePagina.Venta=String(restar);
        this.regBalancePulse.postBalancePulse(balancePagina).subscribe();

        alert("Compra hecha con exito!!!");
        for (let index = 0; index < this.cancionesDB.length; index++) {
                
          saveAs(this.cancionesDB[index], this.musicaNombre[index]+".mp3");
          
        }
        
      },
      transactions: [{
        amount: {
          currency: 'MXN',
          total: 0
        }
      }]
    });
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
  stars(puntos,nomCancion,nomAlbum,nomMusico){
    
    let estrellas=new rating();
    estrellas.cancion=nomCancion;
    estrellas.estrellas=puntos;
    estrellas.nombreAlbum=nomAlbum;
    estrellas.propietarioAlbum=nomMusico;
    estrellas.usuario=this.cookie.get("nombre");
 

    this.regRating.postRatings(estrellas).subscribe();
    alert("Calificación aceptada");
  }
  compartir(nomCancion,nomAlbum,nomMusico,urlCancion,UrlPortada){

    let comentario=prompt("Texto de la publicación");
    let registroCompartidos=new compartidos();
    if (comentario!=null && comentario!="") {

      registroCompartidos.comentario=comentario;
      registroCompartidos.nomAlbum=nomAlbum;
      registroCompartidos.nomCancion=nomCancion;
      registroCompartidos.nomMusico=nomMusico;
      registroCompartidos.urlCancion=urlCancion;
      registroCompartidos.urlPortada=UrlPortada;
      registroCompartidos.publicador=this.cookie.get("nombre");
      this.regCompartidos.postCompartidos(registroCompartidos).subscribe();
      alert("Publicación compartida");
    }else if(comentario==null){
      alert("Operación cancelada");
    }else{
      alert("Ingrese un comentario");
    }
  }
  crearyAgregar(){
    /*
      Aqui obtengo el valor del input donde pone el nuevo nombre y
      del dropdown donde estan las canciones en este caso retorna el value
      no el nombre
    */
    let nombre= $('#nuevoNombre').val();
    let dropdown1=$('select[name=Canciones]').val();
    let maximoId=0;
    if (nombre=="") {
      alert("no ha ingresado nombre de playlist");
    }else if (dropdown1=="Canciones") {
      alert("no ha seleccionado nombre cancion");
    }else{
      for (let index = 0; index < this.playlistsId.length; index++) {
        if (Number(this.playlistsId[index])>maximoId) {
          maximoId=Number(this.playlistsId[index]);
        } 
      }
      //maximo id se le suma 1 para obtener el id con el que se insertara
      maximoId=Number(maximoId)+1
      let registar=new registroPlaylist();
      registar.idPlaylist=String(maximoId);
      registar.nombreCancion=dropdown1;
      registar.nombrePlaylist=nombre;
      registar.propietario=this.cookie.get("nombre");
      registar.propietarioCancion=localStorage.getItem("portada");
      
      //-------------OBTENIENDO EL URL DE LA CANCION--------------------
      let url;
      this.album.getTodasLasCanciones()
        .subscribe(musicas =>{
          let precio1:String;
          let i=0;
          
          Object.keys(musicas).forEach(function(key) {
            let nombre1,cancionNom,idAlbum1:string;
            [nombre1,cancionNom,idAlbum1]= key.split(",");
            if (cancionNom==dropdown1) {
              url=musicas[key];
            }
          });
          registar.url=url;
          this.regPlaylist.postRegistroPlaylist(registar).subscribe();
        });
      //--------------------------------------------------
        alert("Playlist creada");
    }
    
    

  }
  agregaraPlaylist(){
    let dropdown1=$('select[name=playlist]').val();
    let dropdown1Txt=$("select[name=Canciones2] option:selected").text();
    let dropdown2=$('select[name=Canciones2]').val();
    if (dropdown1=="Playlists") {
      alert("No ha seleccionado playlist");
    }else{
      if(dropdown1Txt=="Canciones"){
        alert("No ha seleccionado Cancion");
      }else{
        let id=dropdown1;
        let url;
        let musico= localStorage.getItem("portada");
        //AQUI LLEGA SI SE CUMPIERON LAS VALIDACIONES
        
        let registro=new registroPlaylist();
        registro.idPlaylist=id;
        registro.nombreCancion=dropdown1Txt;//nombre de la cancion
        registro.propietario=this.usuario;
        registro.propietarioCancion=localStorage.getItem("portada");
        
        
        //-------------OBTENIENDO EL URL DE LA CANCION--------------------
    this.album.getTodasLasCanciones()
      .subscribe(musicas =>{
        let precio1:String;
        let i=0;
        
        Object.keys(musicas).forEach(function(key) {
          let nombre1,cancionNom,idAlbum1:string;
          [nombre1,cancionNom,idAlbum1]= key.split(",");
          if (cancionNom==dropdown1Txt && nombre1==musico) {
            url=musicas[key];
          }
        });
        registro.url=url;
        this.regPlaylist.postRegistroPlaylist(registro).subscribe();
      });
    //--------------------------------------------------
        alert("Cancion agregada correctamente");
      }
    }
  }
  /*Variables para usar aqui en cambio playlist accordion 2 */
  nombreCancPlay:String[]=[];
  idplaylistsz:String[]=[];
  
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
  publicar(){
    window.location.href="/Inicio/Musico/Publicar";
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
  irInicio(){
    if (this.cookie.get("rol")=="normal") {
      window.location.href="/Inicio/Normal";
    }else if(this.cookie.get("rol")=="musico"){
      window.location.href="/Inicio/Musico";
    }else if(this.cookie.get("rol")=="administrador"){
      window.location.href="/Inicio/Administrador";
    }
  }
  
  cambioBaja(){
    let cadenaEliminacion:String=localStorage.getItem("portada")+","+localStorage.getItem("nombre")+","+localStorage.getItem("idAlbum")+","+localStorage.getItem("precioAlbum")+","+localStorage.getItem("portadasEstado");
    let portadaUrl:String=localStorage.getItem("portadasImagenes");
    this.EliAlbum.delAlbum(cadenaEliminacion).subscribe(newpres=>{});
    let cadenaIngresar:String=localStorage.getItem("portada")+","+localStorage.getItem("nombre")+","+localStorage.getItem("idAlbum")+","+localStorage.getItem("precioAlbum")+",B";

    var rootRef = firebase.database().ref().child("Portadas").child(String(cadenaIngresar)).set(portadaUrl);
    this.regAlbum.postPortada(rootRef).subscribe();
    this.estado=false;
  }
  cambioAlta(){
    let cadenaEliminacion:String=localStorage.getItem("portada")+","+localStorage.getItem("nombre")+","+localStorage.getItem("idAlbum")+","+localStorage.getItem("precioAlbum")+","+localStorage.getItem("portadasEstado");
    let portadaUrl:String=localStorage.getItem("portadasImagenes");
    this.EliAlbum.delAlbum(cadenaEliminacion).subscribe(newpres=>{});
    let cadenaIngresar:String=localStorage.getItem("portada")+","+localStorage.getItem("nombre")+","+localStorage.getItem("idAlbum")+","+localStorage.getItem("precioAlbum")+",A";

    var rootRef = firebase.database().ref().child("Portadas").child(String(cadenaIngresar)).set(portadaUrl);
    this.regAlbum.postPortada(rootRef).subscribe();
    this.estado=true;
  }
  ngOnInit() {
    firebase.initializeApp( {
      apiKey: "AIzaSyC4um45LsiQWemYv_Kpwppzq6BwF3AtHww",
      authDomain: "pulse-863f8.firebaseapp.com",
      databaseURL: "https://pulse-863f8.firebaseio.com",
      projectId: "pulse-863f8",
      storageBucket: "pulse-863f8.appspot.com",
      messagingSenderId: "997581533112"
    });
    this.initConfig();
    
  }
    
    
}
