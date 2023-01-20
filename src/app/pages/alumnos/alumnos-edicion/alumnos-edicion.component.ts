import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Alumnos } from 'src/app/_model/alumnos';
import { AlumnosService } from 'src/app/_service/alumnos.service';

@Component({
  selector: 'app-alumnos-edicion',
  templateUrl: './alumnos-edicion.component.html',
  styleUrls: ['./alumnos-edicion.component.css']
})
export class AlumnosEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnosService: AlumnosService

    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id_alumno': new FormControl(0),
      'nombre': new FormControl(''),
      'ap_paterno': new FormControl(''),
      'ap_materno': new FormControl(''),
      'activo': new FormControl(0),
    });

    this.route.params.subscribe( (data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    if(this.edicion){
      this.alumnosService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id_alumno': new FormControl(data.id_alumno),
          'nombre': new FormControl(data.nombre),
          'ap_paterno': new FormControl(data.ap_paterno),
          'ap_materno': new FormControl(data.ap_materno),
          'activo': new FormControl(data.activo),
        });
      });
    }
  }
  operar(){
    let alumnos = new Alumnos();
    alumnos.id_alumno = this.form.value['id_alumno'];
    alumnos.nombre = this.form.value['nombre'];
    alumnos.ap_paterno = this.form.value['ap_paterno'];
    alumnos.ap_materno = this.form.value['ap_materno'];
    alumnos.activo = this.form.value['activo'];

    if(this.edicion){
      this.alumnosService.modificar(alumnos).subscribe( () => {
        this.alumnosService.listar().subscribe(data => {
          this.alumnosService.alumnoCambio.next(data);
          this.alumnosService.mensajeCambio.next("SE MODIFICO...");
        });
      });
    } else {
      this.alumnosService.registrar(alumnos).subscribe( () => {
        this.alumnosService.listar().subscribe(data => {
          this.alumnosService.alumnoCambio.next(data);
          this.alumnosService.mensajeCambio.next("SE REGISTRO...");
        });
      });
    }

    this.router.navigate(['alumnos']);
  }

}
