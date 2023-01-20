import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Alumnos } from 'src/app/_model/alumnos';
import { AlumnosService } from 'src/app/_service/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'aPaterno', 'aMaterno', 'acciones']
  dataSource: MatTableDataSource<Alumnos>;

  constructor(
    private alumnosService: AlumnosService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.alumnosService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.alumnosService.alumnoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.alumnosService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO: ', { duration: 3000 });
    });
  }

  eliminar(id_alumno: number) {
    this.alumnosService.eliminar(id_alumno).subscribe( () => {
      this.alumnosService.listar().subscribe(data => {
        this.alumnosService.alumnoCambio.next(data);
        this.alumnosService.mensajeCambio.next("SE ELIMINO...");
      });
    });
  }

}
