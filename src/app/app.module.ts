import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule, Routes } from "@angular/router";
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 


//Componentes
import { AppComponent } from "./app.component";
import { PaginaPrincipalComponent } from "./pagina-principal/pagina-principal.component";
import { NoEncontradoComponent } from "./no-encontrado/no-encontrado.component";
import { RegistroComponent } from "./registro/registro.component";
import { FuncionamientoComponent } from './funcionamiento/funcionamiento.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PanelusuarioComponent } from './panelusuario/panelusuario.component';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';
import { ComandasComponent } from './comandas/comandas.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { InicioComponent } from './inicio/inicio.component';
import { CocinaComponent } from './cocina/cocina.component';



const appRoutes: Routes = [
  { path: "", component: NavbarComponent ,
  children: [
    {
      path: '', 
      component:PaginaPrincipalComponent 
    },
    {
      path: 'funcionamiento', 
      component:FuncionamientoComponent 
    },

  ]
  },
  
  { path: "registro", component: RegistroComponent},
  { path: "login", component: LoginComponent},
  { path: "panel", component: NavbarUsuarioComponent,
  children: [
    {
      path:'',
      component:InicioComponent
    },
   
    {
      path: 'comandas', 
      component:ComandasComponent 
    },
    {
      path: 'empleados', 
      component:EmpleadosComponent 
    },
    {
      path: 'cocina', 
      component:CocinaComponent 
    },

  ]},
  { path: "**", component: NoEncontradoComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    NoEncontradoComponent,
    RegistroComponent,
    FuncionamientoComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    PanelusuarioComponent,
    NavbarUsuarioComponent,
    ComandasComponent,
    EmpleadosComponent,
    InicioComponent,
    CocinaComponent
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,
    ReactiveFormsModule,RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
