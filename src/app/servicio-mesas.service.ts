import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioMesasService {

  
  constructor(private http: HttpClient) { }

  obtenerMesas(){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/mesas");
  }
  
}
