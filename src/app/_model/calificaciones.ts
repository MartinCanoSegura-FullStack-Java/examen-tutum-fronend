import { Alumnos } from "./alumnos";
import { Materias } from "./materias";

export class Calificaciones {
  id_calificacion: number;
  materia: Materias;
  alumno: Alumnos;
  calificacion: string;
  fechaRegistro: string;
}
