import { Component, OnInit } from '@angular/core';
import { ServicioEmpleadosService } from "../servicio-empleados.service";
import { Empleado,datosEmpleados } from "../empleado";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  empleados :Empleado[];
  constructor(private servicioEmpleados:ServicioEmpleadosService) { }

  ngOnInit(): void {
    this.servicioEmpleados.obtenerEmpleados()
        .subscribe((response)=>{
          console.log(response);
          this.empleados=(response as datosEmpleados).data;
        })
  }
  eliminar(id){    
    console.log(id);
    this.servicioEmpleados
  .eliminarEmpleado(id)
  .subscribe();
  
  this.ngOnInit();
  }

}
