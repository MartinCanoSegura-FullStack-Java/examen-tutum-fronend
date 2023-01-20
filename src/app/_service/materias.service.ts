import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materias } from '../_model/materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  materiasCambio = new Subject<Materias[]>();
  mensajeCambio = new Subject<string>();

  private url = `${ environment.HOST }/materias`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Materias[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Materias>(`${this.url}/${id}`);
  }

  registrar(materia: Materias){
    return this.http.post(this.url, materia);
  }

  modificar(materia: Materias){
    return this.http.put(this.url, materia);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
