
import { Injectable } from '@angular/core';
import { DICTIONARYKEYS } from 'src/app/utils/DICTIONARYKEYS';
import { URLs_OFRTACADEMICA } from './url_OfrtAcademica';
import { ErrorService } from '../z_error_services/error.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OfrtAcademicaService {
  //RUTA POST
  post_Area_Conocimiento = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Area_Conocimiento;
  post_Carrera = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Carrera;
  post_Clasificacion_IES = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Clasificacion_IES;
  post_Departamento = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Departamento;
  post_Detalle_Sede_Facultad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Detalle_Sede_Facultad;
  post_Enfoque_Curricular = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Enfoque_Curricular;
  post_Facultad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Facultad;
  post_Grado_Academico = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Grado_Academico;
  post_IES = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_IES;
  post_Matriz_Carrera_Combinacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Matriz_Carrera_Combinacion;
  post_Modalidad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Modalidad;
  post_Municipio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Municipio;
  post_Nivel_Formacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Nivel_Formacion;
  post_Pais = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Pais;
  post_Plan_Estudio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Plan_Estudio;
  post_Programa_Especial = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Programa_Especial;
  post_Regimen_Academico = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Regimen_Academico;
  post_Sede = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Sede;
  post_Statuss = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Statuss;
  post_Tipo_Formacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Tipo_Formacion;
  post_Turno = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Turno;
  post_Vinculacion_Convenio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().post_Vinculacion_Convenio;

  //RUTA AMBAS : GET Y DELETE 
  getDell_Area_Conocimiento = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Area_Conocimiento;
  getDell_Carrera = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Carrera;
  getDell_Clasificacion_IES = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Clasificacion_IES;
  getDell_Departamento = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Departamento;
  getDell_Detalle_Sede_Facultad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Detalle_Sede_Facultad;
  getDell_Enfoque_Curricular = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Enfoque_Curricular;
  getDell_Facultad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Facultad;
  getDell_Grado_Academico = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Grado_Academico;
  getDell_IES = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_IES;
  getDell_Matriz_Carrera_Combinacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Matriz_Carrera_Combinacion;
  getDell_Modalidad = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Modalidad;
  getDell_Municipio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Municipio;
  getDell_Nivel_Formacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Nivel_Formacion;
  getDell_Pais = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Pais;
  getDell_Plan_Estudio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Plan_Estudio;
  getDell_Programa_Especial = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Programa_Especial;
  getDell_Regimen_Academico = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Regimen_Academico;
  getDell_Sede = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Sede;
  getDell_Statuss = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Statuss;
  getDell_Tipo_Formacion = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Tipo_Formacion;
  getDell_Turno = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Turno;
  getDell_Vinculacion_Convenio = new DICTIONARYKEYS().urlOA + new URLs_OFRTACADEMICA().getDell_Vinculacion_Convenio;

  constructor(private http: HttpClient, private error: ErrorService) { }
  
  //servicios POST
  add_Area_Conocimiento(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Area_Conocimiento, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Carrera(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Carrera, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Clasificacion_IES(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Clasificacion_IES, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Departamento(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Departamento, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Detalle_Sede_Facultad(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Detalle_Sede_Facultad, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Enfoque_Curricular(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Enfoque_Curricular, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Facultad(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Facultad, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Grado_Academico(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Grado_Academico, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_IES(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_IES, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Matriz_Carrera_Combinacion(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Matriz_Carrera_Combinacion, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Modalidad(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Modalidad, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Municipio(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Municipio, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Nivel_Formacion(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Nivel_Formacion, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Pais(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Pais, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Plan_Estudio(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Plan_Estudio, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Programa_Especial(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Programa_Especial, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Regimen_Academico(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Regimen_Academico, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Sede(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Sede, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Statuss(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Statuss, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Tipo_Formacion(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Tipo_Formacion, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Turno(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Turno, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }
  add_Vinculacion_Convenio(obj_full: any): Observable<any[]> {
    return this.http.post<any>(this.post_Vinculacion_Convenio, { json:obj_full })
      .pipe(retry(1), catchError(this.error.handleError));
  }


  //servicios: GET Y DELETE 
  get_Area_Conocimiento(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Area_Conocimiento +obj_full)
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Carrera(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Carrera + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Clasificacion_IES(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Clasificacion_IES + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Departamento(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Departamento + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Detalle_Sede_Facultad(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Detalle_Sede_Facultad + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Enfoque_Curricular(obj_full: any): Observable<any> {    
    return this.
      http.get<any>(this.getDell_Enfoque_Curricular + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Facultad(obj_full: any): Observable<any> {    
    return this.
      http.get<any>(this.getDell_Facultad + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Grado_Academico(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Grado_Academico + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_IES(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_IES + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Matriz_Carrera_Combinacion(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Matriz_Carrera_Combinacion + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Modalidad(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Modalidad + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Municipio(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Municipio + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Nivel_Formacion(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Nivel_Formacion + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Pais(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Pais + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Plan_Estudio(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Plan_Estudio + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Programa_Especial(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Programa_Especial + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Regimen_Academico(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Regimen_Academico + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Sede(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Sede + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Statuss(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Statuss + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Tipo_Formacion(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Tipo_Formacion + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Turno(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Turno + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  get_Vinculacion_Convenio(obj_full: any): Observable<any> {
    return this.
      http.get<any>(this.getDell_Vinculacion_Convenio + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }

  //servicios: DELETE 
  Dell_Area_Conocimiento(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Area_Conocimiento+'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Carrera(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Carrera+'del/' + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Clasificacion_IES(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Clasificacion_IES+'del/' + obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Departamento(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Departamento +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Detalle_Sede_Facultad(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Detalle_Sede_Facultad +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Enfoque_Curricular(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Enfoque_Curricular +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Facultad(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Facultad +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Grado_Academico(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Grado_Academico +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_IES(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_IES +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Matriz_Carrera_Combinacion(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Matriz_Carrera_Combinacion +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Modalidad(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Modalidad +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Municipio(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Municipio +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Nivel_Formacion(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Nivel_Formacion +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Pais(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Pais +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Plan_Estudio(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Plan_Estudio +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Programa_Especial(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Programa_Especial +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Regimen_Academico(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Regimen_Academico +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Sede(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Sede +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Statuss(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Statuss +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Tipo_Formacion(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Tipo_Formacion +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Turno(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Turno +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }
  Dell_Vinculacion_Convenio(obj_full: any): Observable<any> {
    return this.
      http.delete<any>(this.getDell_Vinculacion_Convenio +'del/'+ obj_full )
      .pipe(retry(1), catchError(this.error.handleError));
  }

}