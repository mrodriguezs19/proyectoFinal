import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Administrador } from "../interfaces/administrador";
import { catchError, retry } from 'rxjs/operators';
import { User } from "../interfaces/user";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root",
})
export class ServicioAdministradoresService {
  constructor(private http: HttpClient) {}

  introducirAdministrador(administrador:Administrador):Observable<Administrador> {
    return this.http.post<Administrador>("http://pi.diiesmurgi.org/~miguel/public/api/administradores",administrador,httpOptions);
  }
  introducirUsuario(user:User):Observable<User>{
    return this.http.post<User>("http://pi.diiesmurgi.org/~miguel/public/api/users",user,httpOptions);

  }
  obtenerAdministradores(email,contrasena){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/administradores?filter=correo:"+email+",contrasena:"+contrasena)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ha ocurrido un error en el cliente o en la red:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `El servidor ha devuelto el código de error ${error.status}, ` +
        `el contenido del error es: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Ha ocurrido un problema; por favor vuelve a intentarlo más tarde.');
  };
}
