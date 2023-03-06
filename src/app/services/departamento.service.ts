
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Cargo } from "../models/Cargo";
import { ErrorService } from "./error.service";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService {
    
    url = new DICTIONARYKEYS().url+'/api/Departamento/';
    
    constructor(private http: HttpClient, private error: ErrorService) { }

    getComboCargo(i: number): Observable<Cargo[]> {
        //console.log('valor i :  '+this.url + "Pais/" + i);

        return this.http.get<Cargo[]>(this.url + "Pais/" + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
    getDepartamento(i: number): Observable<Cargo[]> {
        return this.http.get<Cargo[]>(this.url + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
}