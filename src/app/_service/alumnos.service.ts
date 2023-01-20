import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from '../_model/alumnos';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnoCambio = new Subject<Alumnos[]>();
  mensajeCambio = new Subject<string>();

  private url = `${ environment.HOST }/alumnos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Alumnos[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Alumnos>(`${this.url}/${id}`);
  }

  registrar(alumno: Alumnos){
    return this.http.post(this.url, alumno);
  }

  modificar(alumno: Alumnos){
    return this.http.put(this.url, alumno);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
