import { Component, OnInit } from '@angular/core';
import { GuardsService } from '../guards.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.scss']
})
export class NavbarUsuarioComponent implements OnInit {

  constructor(private servicioGuard:GuardsService,public router: Router,) { }

  ngOnInit(): void {
  }
  desconectarse(){
    this.servicioGuard.logout();
    this.router.navigate(['/']);

  }
}
