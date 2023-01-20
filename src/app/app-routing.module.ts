import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosEdicionComponent } from './pages/alumnos/alumnos-edicion/alumnos-edicion.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CalificacionesEdicionComponent } from './pages/calificaciones/calificaciones-edicion/calificaciones-edicion.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { LoginComponent } from './pages/login/login.component';
import { MateriasEdicionComponent } from './pages/materias/materias-edicion/materias-edicion.component';
import { MateriasComponent } from './pages/materias/materias.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent, children: [
    { path: 'nuevo', component: AlumnosEdicionComponent },
    { path: 'edicion/:id', component: AlumnosEdicionComponent }
  ] },

  { path: 'materias', component: MateriasComponent, children: [
    { path: 'nuevo', component: MateriasEdicionComponent },
    { path: 'edicion/:id', component: MateriasEdicionComponent }
  ] },

  { path: 'calificaciones', component: CalificacionesComponent, children: [
    { path: 'nuevo', component: CalificacionesEdicionComponent },
    { path: 'edicion/:id', component: CalificacionesEdicionComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
