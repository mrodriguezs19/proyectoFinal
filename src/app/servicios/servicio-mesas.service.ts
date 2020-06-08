import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Mesa } from "../interfaces/mesa";
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
export class ServicioMesasService {

  
  constructor(private http: HttpClient) { }

  obtenerMesas(id_adm){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/mesas?filter=id_adm:"+id_adm+",",httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  actualizarMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.put<Mesa>("http://pi.diiesmurgi.org/~miguel/public/api/mesas/"+mesa.id, mesa, httpOptions);
      
  }
  
  eliminarMesa(id:number):Observable<{}>{
    return this.http.delete("http://pi.diiesmurgi.org/~miguel/public/api/mesas/"+id,httpOptions);
  }
  introducirMesa(mesa:Mesa):Observable<Mesa> {
    return this.http.post<Mesa>("http://pi.diiesmurgi.org/~miguel/public/api/mesas",mesa,httpOptions);
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
