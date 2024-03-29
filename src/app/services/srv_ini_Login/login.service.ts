
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from '../z_error_services/error.service';
import { DICTIONARYKEYS } from '../../utils/DICTIONARYKEYS';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private error:ErrorService) { }

  url:string = new DICTIONARYKEYS().url;
   httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };

   // dado un usuario saber si exite para dar pase 
   getVerifyLogin(json_cls:any):Observable<any>{          
    return this.http.post<any>(this.url+'/API/Usuario/get',{json_cls},this.httpOptions).
    pipe(retry(1),catchError(this.error.handleError));
  }



  getLogin(cls:User):Observable<any>{       
    return this.http.post<User>(this.url + 'API/login/',JSON.stringify(cls),this.httpOptions).
    pipe(retry(1),catchError(this.error.handleError));
  }

  verify(tkn:string):Observable<boolean>{//si se pone una url como parametro falla la solicitud y el autenticated se pone true arreglarlo
    return this.http.get<boolean>(this.url + 'API/verify/'+tkn). 
    pipe(retry(1),catchError(this.error.handleError));
  }
 
}
