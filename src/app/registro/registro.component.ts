import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ServicioAdministradoresService } from "../servicio-administradores.service";
import { Administrador } from "../administrador";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  correoPattern: any = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
 
  usuarioPattern: any =/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
  contrasenaPattern:any=/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  


  administrador:Administrador={id:0,usuario:'',nombre_completo:'',correo:'',contrasena:'',created_at:new Date,updated_at: new Date};
  
  form = new FormGroup({
    usuario: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(this.usuarioPattern),
    ]),
    nombre: new FormControl("", [Validators.required, Validators.minLength(5)]),
    correo: new FormControl("", [
      Validators.required,
      Validators.pattern(this.correoPattern),
    ]),
    password1: new FormControl("",[
      Validators.required,
      Validators.pattern(this.contrasenaPattern),
    ]),
    password2: new FormControl(""),
  });

  // CREAR VALIDADOR CUSTOMIZADO PARA COMFIRMAR CONTRASEÑA

  
  constructor(private servicioAdministrador: ServicioAdministradoresService) {}
  ngOnInit(): void {}

  //Linea cuando el input tiene contenido
  linea(id) {
    let elem: HTMLElement = document.getElementById(id);
    if (this.form.get(id).value) {
      elem.classList.add("has-val");
    } else {
      elem.classList.remove("has-val");
    }
  }
  get usuario() {
    return this.form.get("usuario");
  }
  get nombre() {
    return this.form.get("nombre");
  }
  get correo() {
    return this.form.get("correo");
  }
  get password1() {
    return this.form.get("password1");
  }
  get password2() {
    return this.form.get("password2");
  }
  onSubmit(){
    this.administrador.usuario=this.form.get("usuario").value;
    this.administrador.nombre_completo=this.form.get("nombre").value;
    this.administrador.correo=this.form.get("correo").value;
    this.administrador.contrasena=this.form.get("password1").value;
    
    console.log(this.administrador);
    this.servicioAdministrador.introducirAdministrador(this.administrador)
    .subscribe();
  }

  
 /* prueba() {
      this.servicioAdministrador.
      introducirAdministrador.(newAdministrador)
      .subscribe((hero) => this.adminis.push(hero));
  }*/
}
