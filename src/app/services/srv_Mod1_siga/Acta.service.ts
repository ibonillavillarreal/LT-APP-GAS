
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from '../zer_otros/error.service';
import { DICTIONARYKEYS } from '../../utils/DICTIONARYKEYS';


@Injectable({
  providedIn: 'root'
})
export class Actas {

  url_local = new DICTIONARYKEYS().url + '/API';
  url = new DICTIONARYKEYS().url + '/API/Acta/';
  urlsubir = new DICTIONARYKEYS().url + '/api';


  constructor(private http: HttpClient, private error: ErrorService) { }
  @Output() addFacturaTerminada: EventEmitter<any> = new EventEmitter();

  getActaListado(): Observable<any> {
    return this.http.get<any>(this.url_local + '/Acta')
      .pipe(retry(1), catchError(this.error.handleError));
  }
  getDetalleAcuerdos(id_Acta: any): Observable<any> {
    return this.http.get<any>(this.url + '/ActaDetalle/' + JSON.stringify(id_Acta)).
      pipe(retry(1), catchError(this.error.handleError));
  }
  getNroActa(): Observable<any[]> {
    return this.http.get<any[]>(this.url_local + '/Acta/getNroActa')
      .pipe(retry(1), catchError(this.error.handleError));
  }

  getNroIdAcuerdo(): Observable<any[]> {
    return this.http.get<any[]>(this.url_local + '/Acta/getNroIdAcuerdo')
      .pipe(retry(1), catchError(this.error.handleError));
  }

  getAgendaActa(): Observable<any> {
    return this.http.get<any>(this.url + '/getAgendaActa')
      .pipe(retry(1), catchError(this.error.handleError));
  }

  postgetPuntosDeAgenda(Cod_Agenda: any): Observable<any> {
    return this.http.post<any>(this.url + 'postgetPuntosDeAgenda', { "Cod_Agenda": Cod_Agenda })
      .pipe(retry(1), catchError(this.error.handleError));
  }

  Add_Json_Acta(Acta_ful: any): Observable<any[]> {
    return this.http.post<any>(this.url_local + '/Acta/AddJsonActa', { "Acta_ful": Acta_ful })
      .pipe(retry(1), catchError(this.error.handleError));
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


  subir(formData: any): Observable<any> {
    return this.http.post<any>(this.url_local + '/Acta/Subir', formData)
      .pipe(retry(1), catchError(this.error.handleError));
  }


  bajrDoc(cod_acta: any): Observable<any> {      
    return this.http.post(this.url + 'Bajar/Docx/',{filename:cod_acta},
    { responseType:'blob',headers: new HttpHeaders().append('Content-Type', 'application/json')}
    ).pipe(retry(1), catchError(this.error.handleError));
  }








  /* ---===========================================================--- */
  /* ---===========================================================--- */
  seguir_Tracking(id_Acta: any): Observable<any> {
    return this.http.get<any>(this.url + '/ordenTracking/' + JSON.stringify(id_Acta)).
      pipe(retry(1), catchError(this.error.handleError));
  }

  estacion_rastreo(numero_factura: any): Observable<any> {
    return this.http.get<any>(this.url + '/estacionrastreo/' + numero_factura).
      pipe(retry(1), catchError(this.error.handleError));
  }

  gettasaKambio(Json_Fecha: any): Observable<any> {
    return this.http.post<any>(this.url_local + '/Acta/tasaKambio', JSON.parse(Json_Fecha))
      .pipe(retry(1), catchError(this.error.handleError));
  }


  //-- json={Cliente:'39',idCOT:'2285',Oper:'6'}
  add_Json_FacturaItems(jsonCadena: any): Observable<any[]> {
    return this.http.post<any>(this.url_local + '/Acta/add_Json_ActaItems', JSON.parse(jsonCadena))
      .pipe(retry(1), catchError(this.error.handleError));
  }

  //-- json={p:'30'}
  get_parametros_pagos(jsonCadena: any): Observable<any[]> {
    return this.http.post<any>(this.url_local + '/Acta/get_parametros', JSON.parse(jsonCadena))
      .pipe(retry(1), catchError(this.error.handleError));
  }

  pasar_TrackingUpdate(obj_facturaUsuario: any): Observable<any> {
    return this.http.post<any>(this.url + 'ordenTrackingUpdate/', JSON.stringify(obj_facturaUsuario))
      .pipe(retry(1), catchError(this.error.handleError));
  }



}

