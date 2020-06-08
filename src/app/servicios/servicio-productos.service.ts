import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Producto } from "../interfaces/producto";
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
export class ServicioProductosService {

  constructor(private http: HttpClient) { }

  obtenerProductos(id_adm){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/productos?filter=id_adm:"+id_adm+",",httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  eliminarProducto(id:number):Observable<{}>{
    return this.http.delete("http://pi.diiesmurgi.org/~miguel/public/api/productos/"+id,httpOptions);
  }
  introducirProducto(producto:Producto){    
    return this.http.post("http://pi.diiesmurgi.org/~miguel/public/api/productos",producto,httpOptions);       
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


  
  
