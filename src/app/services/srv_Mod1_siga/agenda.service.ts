

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from '../z_error_services/error.service';
import { DICTIONARYKEYS } from '../../utils/DICTIONARYKEYS';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  url = new DICTIONARYKEYS().url + '/API/Agenda/';
  url_DelMiembro = new DICTIONARYKEYS().url + '/API/Agenda/Eliminar/';



  constructor(private http: HttpClient, private error: ErrorService) { }

  //get
  getAgenda(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(retry(1), catchError(this.error.handleError));

  }

  //get-Registro-Nro Agenda
  getNroRegAgenda(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'get/nro/')
      .pipe(retry(1), catchError(this.error.handleError));

  }

  getInstitucion(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'Local/Institucion/')
      .pipe(retry(1), catchError(this.error.handleError));

  }

  getConsejo(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'Local/Consejo/')
      .pipe(retry(1), catchError(this.error.handleError));

  }

  add_Agenda(RegistroCompleto_json: any): Observable<any> {

    return this.http.post<any>
      (
        this.url, {RegistroCompleto_json}
      ).pipe(retry(1), catchError(this.error.handleError))


  }

  editAgenda(RegistroCompleto_json: any): Observable<any> {

    return this.http.put<any>
      (
        this.url, {RegistroCompleto_json}
      ).pipe(retry(1), catchError(this.error.handleError))
  }

  DelEditMiembroAgenda(i: any): Observable<any> {
    return this.http.post<any>
      (
        this.url_DelMiembro, {i}
      )
      .pipe(retry(1), catchError(this.error.handleError))
  }

  getVerAgenda(i: number): Observable<any> {
    return this.http.get<any>(this.url + i).
      pipe(retry(1), catchError(this.error.handleError));
  }


  getPrint(i: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    return this.http.get
      (
        this.url + 'imprimir/print/' + i,
        { headers: headers, responseType: 'blob' }
      )
      .pipe(retry(1), catchError(this.error.handleError));
  }


}
