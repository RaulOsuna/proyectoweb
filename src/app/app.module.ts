import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEleccionComponent } from './registro-eleccion/registro-eleccion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroMusicoComponent } from './registro-musico/registro-musico.component';
import { LogueadoNormalComponent } from './logueado-normal/logueado-normal.component';
import { PublicarAlbumComponent } from './publicar-album/publicar-album.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


const routes:Routes=[
{path:'', component:InicioComponent},
{path:'Registro/Normal',component:RegistroComponent},
{path:'Registro/Musico',component:RegistroMusicoComponent},
{path:'Inicio/Normal',component:LogueadoNormalComponent},
{path:'IniciarSesion',component:IniciarSesionComponent},
{path:'Registro',component:RegistroEleccionComponent},
{path:'Publicar',component:PublicarAlbumComponent},
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
    PublicarAlbumComponent
    
    
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
    MatSidenavModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
