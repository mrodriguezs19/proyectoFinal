import { Component, OnInit } from '@angular/core';
import { ServicioEmpleadosService } from "../servicios/servicio-empleados.service";
import { Empleado,datosEmpleados } from "../interfaces/empleado";
import { ServicioMesasService } from "../servicios/servicio-mesas.service";
import { Mesa,datosMesas } from "../interfaces/mesa";
import { ServicioAdministradoresService } from "../servicios/servicio-administradores.service";
import { Administrador } from "../interfaces/administrador";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import pdfFonts from "pdfmake/build/vfs_fonts";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  nombre=localStorage.getItem("nombre");
  n_empleados;
  n_mesas;
  empleados:Empleado[];
  mesas:Mesa[];
  aforo=0;
  admi;
  constructor(private servicioEmpleados:ServicioEmpleadosService,private servicioMesas:ServicioMesasService ,
    private servicioAdm: ServicioAdministradoresService,
    public router:Router,
    public location:Location   
    ) { }

  ngOnInit(): void {
    this.servicioEmpleados.obtenerEmpleados(Number(localStorage.getItem("id_adm"))).subscribe((response) => {
      console.log(response);
      this.empleados = (response as datosEmpleados).data;
      this.n_empleados=this.empleados.length;
    
    });
    this.servicioMesas.obtenerMesas(Number(localStorage.getItem("id_adm"))).subscribe((response) => {
      this.mesas = (response as datosMesas).data;
      this.n_mesas=this.mesas.length;
      for(let mesa of this.mesas){
        console.log(mesa.sillas);
        this.aforo=this.aforo+mesa.sillas;
      }
    });
    this.servicioAdm
    .obtenerAdministradores(localStorage.getItem("email"), localStorage.getItem("password"))
    .subscribe((response) => {
      this.admi = response;
      console.log(this.admi.data[0]);
        
      
    });
  }
  prueba(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf:PdfMakeWrapper = new PdfMakeWrapper();
    pdf.add("Prueba");
    pdf.create().open();
  }
}
