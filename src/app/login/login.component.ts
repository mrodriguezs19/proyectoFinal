import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // LINEAS BLANCAS SI HAY CONTENIDO
  form = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
  });
  constructor() {}
  ngOnInit() {}
  onSubmit() {}

  linea(id) {
    let elem: HTMLElement = document.getElementById(id);
    if (this.form.get(id).value) {
      elem.classList.add("has-val");
    } else {
      elem.classList.remove("has-val");
    }
  }
}
