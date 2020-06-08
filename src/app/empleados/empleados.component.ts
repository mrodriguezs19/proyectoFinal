import { Component, OnInit } from "@angular/core";
import { ServicioEmpleadosService } from "../servicios/servicio-empleados.service";
import { Empleado, datosEmpleados } from "../interfaces/empleado";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";



@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.scss"],
})
export class EmpleadosComponent implements OnInit {
  //VARIABLES
  empleados: Empleado[];
  empleado: Empleado = {
    id: 0,
    dni: "",
    nombre_completo: "",
    correo: "",
    contrasena: "",
    sueldo: 0,
    puesto: "",
    id_adm: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  dniPattern: any = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  correoPattern: any = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  contrasenaPattern: any = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  form = new FormGroup({
    dni: new FormControl("", [
      Validators.required,
      Validators.minLength(9),
      Validators.pattern(this.dniPattern),
    ]),
    nombre: new FormControl("", [Validators.required, Validators.minLength(5)]),
    correo: new FormControl("", [
      Validators.required,
      Validators.pattern(this.correoPattern),
    ]),
    puesto: new FormControl("", [Validators.required]),
    sueldo: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.contrasenaPattern),
    ]),
  });
  pageActual: number = 1;
  filtroEmpleado = "";

  //CONTRUCTOR

  constructor(private servicioEmpleados: ServicioEmpleadosService,public router:Router,public location:Location) {}

  //INICIO
  ngOnInit(): void {
    this.servicioEmpleados.obtenerEmpleados(Number(localStorage.getItem("id_adm"))).subscribe((response) => {
      console.log(response);
      this.empleados = (response as datosEmpleados).data;
    });
  }

  //FUNCIONES
  get dni() {
    return this.form.get("dni");
  }
  get nombre() {
    return this.form.get("nombre");
  }
  get correo() {
    return this.form.get("correo");
  }
  get password() {
    return this.form.get("password");
  }
  get sueldo() {
    return this.form.get("sueldo");
  }
  get puesto() {
    return this.form.get("puesto");
  }

  onSubmit() {
    this.empleado.dni = this.form.get("dni").value;
    this.empleado.nombre_completo = this.form.get("nombre").value;
    this.empleado.correo = this.form.get("correo").value;
    this.empleado.puesto = this.form.get("puesto").value;
    this.empleado.sueldo = this.form.get("sueldo").value;
    this.empleado.contrasena = this.form.get("password").value;
    //INSERTAR ID DEL ADM QUE TIENE LA SESION INICIADA
    this.empleado.id_adm =Number(localStorage.getItem("id_adm"));
    ;
    console.log(this.empleado);
    this.servicioEmpleados.introducirEmpleado(this.empleado).subscribe();
  }

  eliminar(id) {
    console.log(id);
    if (
      confirm(
        "Seguro que deseas dar de baja al empleado?"
      )
    ) {
      this.servicioEmpleados.eliminarEmpleado(id).subscribe();
      this.router.navigateByUrl("/empleados",{skipLocationChange:true}).then(()=>{
        console.log(decodeURI(this.location.path()));
        this.router.navigate([decodeURI(this.location.path())]);
      })

    }
  }
}
