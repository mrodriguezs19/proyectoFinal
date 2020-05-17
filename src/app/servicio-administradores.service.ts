import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Administrador } from "./administrador";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';

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
  
}
