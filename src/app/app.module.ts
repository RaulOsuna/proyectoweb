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

/*Angular Materia e importaciones para la conexion a servidor*/
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';

import { LogueadoMusicoComponent } from './logueado-musico/logueado-musico.component';
/*Servicios de angular */
import {AutenticationService} from './servicios/autentication.service';

/*SERVICIOS POST*/ 
import {AlbumesService} from './servicios/albumes.service';
import {RegistroNormalService} from './servicios/registro-normal.service';
import {RegistroMusicoService} from './servicios/registro-musico.service'

/*SERVICIOS GET*/ 
import {ObtenerUsuarioNormalService } from './servicios/obtener-usuario-normal.service'
import {ObtenerMusicoService} from './servicios/obtener-musico.service';
import {ObtenerPortadasService} from './servicios/obtener-portadas.service';

/*firebase */
import { FileSelectDirective } from 'ng2-file-upload';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
/*COOKIES*/
import { CookieService } from 'ngx-cookie-service';

const routes:Routes=[
{path:'', component:InicioComponent},
{path:'Registro/Normal',component:RegistroComponent},
{path:'Registro/Musico',component:RegistroMusicoComponent},
{path:'Inicio/Normal',component:LogueadoNormalComponent},
{path:'Inicio/Musico',component:LogueadoMusicoComponent},
{path:'IniciarSesion',component:IniciarSesionComponent},
{path:'Registro',component:RegistroEleccionComponent},
{path:'Publicar',component:PublicarAlbumComponent},
{path:'Upload',component:UploadComponent},
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
    AngularFireStorageModule



  ],
  providers: [
    AlbumesService,
    RegistroNormalService,
    RegistroMusicoService,
    ObtenerUsuarioNormalService,
    ObtenerMusicoService,
    AutenticationService,
    CookieService,
    ObtenerPortadasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
