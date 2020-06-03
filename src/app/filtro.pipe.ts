import { Pipe, PipeTransform } from "@angular/core";
import { Empleado } from "./interfaces/empleado";


@Pipe({
  name: "filtro",
})
export class FiltroPipe implements PipeTransform {
  
  transform(empleados: Empleado[], term:string): Empleado[] {
    
    if(!empleados || !term){
      return empleados;
    }
    return empleados.filter(empleados =>
      empleados.dni.toLowerCase().indexOf(term.toLowerCase()) !== -1);
  }
}




