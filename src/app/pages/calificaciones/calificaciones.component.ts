import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Calificaciones } from 'src/app/_model/calificaciones';
import { CalificacionesService } from 'src/app/_service/calificaciones.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  displayedColumns = ['id', 'materia', 'alumno', 'calificacion', 'fecha', 'acciones']
  dataSource: MatTableDataSource<Calificaciones>;

  constructor(
    private calificacionesService: CalificacionesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.calificacionesService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.calificacionesService.calificacionesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.calificacionesService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 3000});
    });
  }

  eliminar(id_calificacion: number) {
    this.calificacionesService.eliminar(id_calificacion).subscribe( () => {
      this.calificacionesService.listar().subscribe(data => {
        this.calificacionesService.calificacionesCambio.next(data);
        this.calificacionesService.mensajeCambio.next("SE ELIMINO...");
      });
    });
  }
}
