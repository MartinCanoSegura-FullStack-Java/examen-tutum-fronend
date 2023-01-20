import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calificaciones } from '../_model/calificaciones';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  calificacionesCambio = new Subject<Calificaciones[]>();
  mensajeCambio = new Subject<string>();

  private url = `${ environment.HOST }/calificaciones`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Calificaciones[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Calificaciones>(`${this.url}/${id}`);
  }

  registrar(calificacion: Calificaciones){
    return this.http.post(this.url, calificacion);
  }

  modificar(calificacion: Calificaciones){
    return this.http.put(this.url, calificacion);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
