import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Empleado } from "../interfaces/empleado";
import { catchError, retry } from 'rxjs/operators';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(localStorage.getItem("email")+":"+localStorage.getItem("password"))
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleadosService {

  constructor(private http: HttpClient) { }

  obtenerEmpleados(id_adm){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/empleados?filter=id_adm:"+id_adm+",",httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  obtenerEmpleadoDatos(correo,password){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/empleados?filter=correo:"+correo+",contrasena:"+password,httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  eliminarEmpleado(id:number):Observable<{}>{
    return this.http.delete("http://pi.diiesmurgi.org/~miguel/public/api/empleados/"+id,httpOptions);
  }
  introducirEmpleado(empleado:Empleado):Observable<Empleado> {
    return this.http.post<Empleado>("http://pi.diiesmurgi.org/~miguel/public/api/empleados",empleado,httpOptions);
  }
  editarEmpleado(empleado:Empleado):Observable<Empleado> {
    return this.http.put<Empleado>("http://pi.diiesmurgi.org/~miguel/public/api/empleados",empleado,httpOptions)
      .pipe(
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
