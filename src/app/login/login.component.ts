import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ServicioAdministradoresService } from "../servicios/servicio-administradores.service";
import { Administrador } from "../interfaces/administrador";
import { Router } from "@angular/router";


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
  });
  email;
  contrasena;
  admi;
  administrador: Administrador;
  constructor(
    private servicioAdm: ServicioAdministradoresService,
    private servicioGuard: GuardsService,
    public router: Router,
  ) {}
  ngOnInit() {}
  onSubmit() {
    this.email = this.form.get("email").value;
    this.contrasena = this.form.get("password").value;

    this.servicioAdm
      .obtenerAdministradores(this.email, this.contrasena)
      .subscribe((response) => {
        this.admi = response;
        console.log(this.admi.data[0]);
        if (this.admi.data[0] === undefined) {
          
        } else {
          console.log(this.admi.data[0]);
          this.servicioGuard.login(this.email,this.contrasena,this.admi.data[0].id);
            this.router.navigate(['/panel']);
        }
        
      });
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
