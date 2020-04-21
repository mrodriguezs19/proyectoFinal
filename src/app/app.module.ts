import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { AppComponent } from "./app.component";
import { PaginaPrincipalComponent } from "./pagina-principal/pagina-principal.component";
import { NoEncontradoComponent } from "./no-encontrado/no-encontrado.component";
import { RegistroComponent } from "./registro/registro.component";
import { FuncionamientoComponent } from './funcionamiento/funcionamiento.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';



const appRoutes: Routes = [
  { path: "", component: PaginaPrincipalComponent },
  { path: "funcionamiento", component: FuncionamientoComponent},
  { path: "registro", component: RegistroComponent},
  { path: "login", component: LoginComponent},
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
    NavbarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,
    ReactiveFormsModule,RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
