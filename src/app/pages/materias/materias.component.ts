import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Materias } from 'src/app/_model/materias';
import { MateriasService } from 'src/app/_service/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones']
  dataSource: MatTableDataSource<Materias>;

  constructor(
    private materiasService: MateriasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.materiasService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.materiasService.materiasCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.materiasService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 3000});
    });
  }

  eliminar(id_materia: number) {
    this.materiasService.eliminar(id_materia).subscribe( () => {
      this.materiasService.listar().subscribe(data => {
        this.materiasService.materiasCambio.next(data);
        this.materiasService.mensajeCambio.next("SE ELIMINO...");
      });
    });
  }

}
