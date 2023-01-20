import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Materias } from 'src/app/_model/materias';
import { MateriasService } from 'src/app/_service/materias.service';

@Component({
  selector: 'app-materias-edicion',
  templateUrl: './materias-edicion.component.html',
  styleUrls: ['./materias-edicion.component.css']
})
export class MateriasEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id_materia': new FormControl(0),
      'nombre': new FormControl(''),
      'activo': new FormControl(0),
    });

    this.route.params.subscribe( (data: Params) => {
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    if(this.edicion){
      this.materiasService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id_materia': new FormControl(data.id_materia),
          'nombre': new FormControl(data.nombre),
          'activo': new FormControl(data.activo),
        });
      });
    }
  }

  operar(){
    let materia = new Materias();
    materia.id_materia = this.form.value['id_materia'];
    materia.nombre = this.form.value['nombre'];
    materia.activo = this.form.value['activo'];

    if(this.edicion){
      this.materiasService.modificar(materia).subscribe( () => {
        this.materiasService.listar().subscribe(data => {
          this.materiasService.materiasCambio.next(data);
          this.materiasService.mensajeCambio.next("SE MODIFICO...");
        });
      });
    } else {
      this.materiasService.registrar(materia).subscribe( () => {
        this.materiasService.listar().subscribe(data => {
          this.materiasService.materiasCambio.next(data);
          this.materiasService.mensajeCambio.next("SE REGISTRO...");
        });
      });
    }

    this.router.navigate(['materias']);
  }

}
