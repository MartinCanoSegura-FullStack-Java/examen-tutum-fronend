import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alumnos } from 'src/app/_model/alumnos';
import { Calificaciones } from 'src/app/_model/calificaciones';
import { Materias } from 'src/app/_model/materias';
import { AlumnosService } from 'src/app/_service/alumnos.service';
import { CalificacionesService } from 'src/app/_service/calificaciones.service';
import { MateriasService } from 'src/app/_service/materias.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calificaciones-edicion',
  templateUrl: './calificaciones-edicion.component.html',
  styleUrls: ['./calificaciones-edicion.component.css']
})
export class CalificacionesEdicionComponent implements OnInit {

  id: number;
  edicion: boolean;

  alumnos$: Observable<Alumnos[]>;
  materias$: Observable<Materias[]>;
  calificaciones$: Observable<Calificaciones[]>;
  calificaciones: Calificaciones;
  calificacion$: Observable<Calificaciones>;

  promedio: number;
  calificacion: string;

  idAlumnoSeleccionado: number = 0;
  idMateriaSeleccionado: number = 0;

  fechaSeleccionada: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calificacionesService: CalificacionesService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( (data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    });

    this.alumnos$ = this.alumnosService.listar();
    this.materias$ = this.materiasService.listar();
    this.calificaciones$ = this.calificacionesService.listar();
    this.calificacion$ = this.calificacionesService.listarPorId(this.id);

    if(this.edicion){
      this.calificaciones$.subscribe(data => {
        let suma: number = 0;
        data.forEach(dato => {
          suma = suma + parseInt(dato.calificacion, 10);
        });
        this.promedio = suma/data.length;
      });

      this.calificacion$.subscribe(data => {
        this.calificacion = data.calificacion;
        this.idAlumnoSeleccionado = data.alumno.id_alumno;
        this.idMateriaSeleccionado = data.materia.id_materia;
        this.fechaSeleccionada = new Date(moment(data.fechaRegistro).format("YYYY-MM-DDTHH:mm:ss"));
      });
    }
  }

  operar(){
    let alumno = new Alumnos();
    alumno.id_alumno = this.idAlumnoSeleccionado;

    let materia = new Materias();
    materia.id_materia = this.idMateriaSeleccionado;

    let calificaciones = new Calificaciones();
    calificaciones.id_calificacion = this.id;
    calificaciones.calificacion = this.calificacion;
    calificaciones.alumno = alumno;
    calificaciones.materia = materia;
    calificaciones.fechaRegistro = moment(this.fechaSeleccionada).format("YYYY-MM-DDTHH:mm:ss");

    // console.log(calificaciones);
    this.calificacionesService.registrar(calificaciones).subscribe( () => {
      this.calificacionesService.listar().subscribe(data => {
        this.calificacionesService.calificacionesCambio.next(data);
        this.edicion ? this.snackBar.open("SE MODIFICO", "AVISO", { duration: 3000 }) :
        this.snackBar.open("SE REGISTRO", "AVISO", { duration: 3000 });
          setTimeout( () => {
            this.router.navigate(['calificaciones']);
          }, 2000)
      });

    });

    this.router.navigate(['calificaciones']);
  }

  estadoBotonRegistrar(){
    return  this.idAlumnoSeleccionado !== 0 &&
            this.idMateriaSeleccionado !== 0 &&
            this.calificacion !== '' &&
            this.promedio !== 0 ? false : true;
  }

}
