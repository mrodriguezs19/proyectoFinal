import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleadosService {

  constructor(private http: HttpClient) { }

  obtenerEmpleados(){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/empleados");
  }
  eliminarEmpleado(id:number):Observable<{}>{
    return this.http.delete("http://pi.diiesmurgi.org/~miguel/public/api/empleados/"+id,httpOptions);
  }
  
}     
