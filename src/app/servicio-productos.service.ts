import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicioProductosService {

  constructor(private http: HttpClient) { }

  obtenerProductos(){
    return this.http.get("http://pi.diiesmurgi.org/~miguel/public/api/productos");
  }
  
}


  
  
