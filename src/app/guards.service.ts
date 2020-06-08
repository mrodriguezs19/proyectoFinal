import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  readonly usuario ="usuario";
  
  constructor() { }


  login(email,password,id){
    localStorage.setItem(this.usuario,"true");
    //Datos del adm 
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
    localStorage.setItem("id_adm",id);
    console.log("Has iniciado sesion");
  }
  islogin(){
    const islogin=localStorage.getItem(this.usuario);
    if(!islogin){
      console.log("No esta logueado");
      return false;
    }
    else{
      console.log("Si esta logueado");
      return true;
    }
    
  }
  logout(){
    localStorage.removeItem(this.usuario);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    console.log("Has cerrado sesion");

  }
}
