import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from "./interfaces/producto";

@Pipe({
  name: 'filtroProductos'
})
export class FiltroProductosPipe implements PipeTransform {

  transform(productos: Producto[], term:string): Producto[] {
    
    if(!productos || !term){
      return productos;
    }
    return productos.filter(productos =>
      productos.nombre.toLowerCase().indexOf(term.toLowerCase()) !== -1);
  }

}
