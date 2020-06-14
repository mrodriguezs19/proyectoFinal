import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ServicioAdministradoresService } from "../servicios/servicio-administradores.service";
import { Administrador } from "../interfaces/administrador";
import { ServicioEmpleadosService } from "../servicios/servicio-empleados.service";
import { Empleado } from "../interfaces/empleado";
import { Router } from "@angular/router";
import { Location } from "@angular/common";


import { GuardsService } from "../guards.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    puesto: new FormControl(""),
  });
  email;
  contrasena;
  admi;
  empleado;
  puesto;
  administrador: Administrador;
  constructor(
    private servicioAdm: ServicioAdministradoresService,
    private servicioEmp: ServicioEmpleadosService,
    private servicioGuard: GuardsService,
    public router:Router,
    public location:Location  
  ) {}
  ngOnInit() {}
  onSubmit() {
    this.email = this.form.get("email").value;
    this.contrasena = this.form.get("password").value;
    this.puesto = this.form.get("puesto").value;
    
    console.log(this.puesto);
    if (this.puesto == "empleado") {
      this.servicioEmp
        .obtenerEmpleadoDatos(this.email, this.contrasena)
        .subscribe((response) => {
          this.empleado = response;
          console.log(this.empleado.data[0].id);
          if (this.empleado.data[0] === undefined) {
            alert("No existe este empleado");
          } else {
            this.servicioAdm.obtenerAdminId(this.empleado.data[0].id_adm).subscribe(
              (response)=>{
                this.admi=response;
                console.log(this.admi);
                this.servicioGuard.loginEmpleado(this.empleado.data[0].id,this.admi.data[0].id,this.admi.data[0].correo,this.admi.data[0].contrasena);
              
              }
            );
            
            this.router.navigateByUrl("/panel",{skipLocationChange:true}).then(()=>{
              this.router.navigate([decodeURI(this.location.path())]);
                  }
                )
          }
        });
    } else {
      
      this.servicioAdm
        .obtenerAdministradores(this.email, this.contrasena)
        .subscribe((response) => {
          this.admi = response;
          console.log(this.admi.data[0]);
          if (this.admi.data[0] === undefined) {
            alert("No existe este usuario");
            
          } else {
            console.log(this.admi.data[0]);
            
            this.servicioGuard.login(
              this.email,
              this.contrasena,
              this.admi.data[0].id
            );
            this.router.navigate(["/panel"]);
          }
        });
    }
  }

  linea(id) {
    let elem: HTMLElement = document.getElementById(id);
    if (this.form.get(id).value) {
      elem.classList.add("has-val");
    } else {
      elem.classList.remove("has-val");
    }
  }
}
