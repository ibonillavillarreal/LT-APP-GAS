

import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    constructor() { }
    
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            
            errorMessage = error.error.message;
        } else {
            
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }        
        return throwError(errorMessage);
    }
}