import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
/*Componentes*/
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEleccionComponent } from './registro-eleccion/registro-eleccion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroMusicoComponent } from './registro-musico/registro-musico.component';
import { LogueadoNormalComponent } from './logueado-normal/logueado-normal.component';
import { PublicarAlbumComponent } from './publicar-album/publicar-album.component';
import { UploadComponent } from './upload/upload.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { AlbumSeleccionadoComponent } from './album-seleccionado/album-seleccionado.component';
import { PaypalComponent } from './paypal/paypal.component';
import { DiscografiaComponent } from './discografia/discografia.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistSeleccionadoComponent } from './playlist-seleccionado/playlist-seleccionado.component';

/*Angular Materia e importaciones para la conexion a servidor*/
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';

import { LogueadoMusicoComponent } from './logueado-musico/logueado-musico.component';
/*Servicios de angular */
import {AutenticationService} from './servicios/autentication.service';

/*SERVICIOS POST*/ 
import {AlbumesService} from './servicios/albumes.service';
import {RegistroNormalService} from './servicios/registro-normal.service';
import {RegistroMusicoService} from './servicios/registro-musico.service'
import {RegistrarAlbumService} from './servicios/registrar-album.service';
import {RegistrarBalanceService} from './servicios/registrar-balance.service';
import {RegistrarPlaylistService} from './servicios/registrar-playlist.service'
/*SERVICIOS GET*/ 
import {ObtenerUsuarioNormalService } from './servicios/obtener-usuario-normal.service'
import {ObtenerMusicoService} from './servicios/obtener-musico.service';
import {ObtenerPortadasService} from './servicios/obtener-portadas.service';

/*SERVICIOS DELETE */
import {EliminarCancionService} from './servicios/eliminar-cancion.service';
import {EliminarAlbumService} from './servicios/eliminar-album.service';

/*firebase */
import { FileSelectDirective } from 'ng2-file-upload';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

/*PAYPAL */
import { NgxPayPalModule } from 'ngx-paypal';
/*COOKIES*/
import { CookieService } from 'ngx-cookie-service';
/*Variables Globales */
import {GlobalesService} from './servicios/globales.service';


const routes:Routes=[
{path:'', component:InicioComponent},
/*RUTAS DEL INICIO */
{path:'IniciarSesion',component:IniciarSesionComponent},
{path:'Registro',component:RegistroEleccionComponent},
{path:'Upload',component:UploadComponent},
/*USUARIO MUSICO */
{path:'Registro/Musico',component:RegistroMusicoComponent},
{path:'Inicio/Musico',component:LogueadoMusicoComponent},
{path:'Inicio/Musico/Publicar',component:PublicarAlbumComponent},
{path:'Inicio/Musico/Explorar',component:ExplorarComponent},
{path:'Inicio/Musico/Explorar/Album',component:AlbumSeleccionadoComponent},
{path:'Inicio/Musico/Discografia',component:DiscografiaComponent},
{path:'Inicio/Musico/Playlist',component:PlaylistComponent},
{path:'Inicio/Musico/Playlist/Seleccionado',component:PlaylistSeleccionadoComponent},
/*TODO LO QUE ES USUARIO NORMAL */
{path:'Registro/Normal',component:RegistroComponent},
{path:'Inicio/Normal',component:LogueadoNormalComponent},
{path:'Inicio/Normal/Explorar',component:ExplorarComponent},
{path:'Inicio/Normal/Explorar/Album',component:AlbumSeleccionadoComponent},
{path:'Inicio/Normal/Playlist',component:PlaylistComponent},
{path:'Inicio/Normal/Playlist/Seleccionado',component:PlaylistSeleccionadoComponent},
/*Si es ruta invalida */
{path:'**',component:InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    RegistroEleccionComponent,
    IniciarSesionComponent,
    RegistroMusicoComponent,
    LogueadoNormalComponent,
    PublicarAlbumComponent,
    LogueadoMusicoComponent,
    UploadComponent,
    FileSelectDirective,
    ExplorarComponent,
    AlbumSeleccionadoComponent,
    PaypalComponent,
    DiscografiaComponent,
    PlaylistComponent,
    PlaylistSeleccionadoComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgxPayPalModule,
    MatExpansionModule,
    



  ],
  providers: [
    AlbumesService,
    RegistroNormalService,
    RegistroMusicoService,
    ObtenerUsuarioNormalService,
    ObtenerMusicoService,
    AutenticationService,
    CookieService,
    ObtenerPortadasService,
    RegistrarAlbumService,
    GlobalesService,
    EliminarCancionService,
    EliminarAlbumService,
    RegistrarBalanceService,
    RegistrarPlaylistService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
