import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {
    
  }

  prueba(){
//Marcar en negrita la direccion elegida
if(this.router.url=='/funcionamiento'){
  document.getElementById("funcionamiento").style.fontWeight = "bold";
}
else if(this.router.url=='/'){
  document.getElementById("inicio").style.fontWeight = "bold";

}
  }

}
