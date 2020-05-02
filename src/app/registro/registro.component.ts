import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form = new FormGroup({
    usuario: new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
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
