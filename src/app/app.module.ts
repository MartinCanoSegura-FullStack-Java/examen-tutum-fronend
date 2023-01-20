import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AlumnosEdicionComponent } from './pages/alumnos/alumnos-edicion/alumnos-edicion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MateriasComponent } from './pages/materias/materias.component';
import { MateriasEdicionComponent } from './pages/materias/materias-edicion/materias-edicion.component';
import { CalificacionesEdicionComponent } from './pages/calificaciones/calificaciones-edicion/calificaciones-edicion.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CalificacionesComponent,
    AlumnosEdicionComponent,
    MateriasComponent,
    MateriasEdicionComponent,
    CalificacionesEdicionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
