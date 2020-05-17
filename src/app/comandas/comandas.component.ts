import { Component, OnInit } from "@angular/core";
import { ServicioProductosService } from "../servicio-productos.service";
import { Producto, datosProductos } from "../producto";
import { ServicioMesasService } from "../servicio-mesas.service";
import { Mesa, datosMesas } from "../mesa";


@Component({
  selector: "app-comandas",
  templateUrl: "./comandas.component.html",
  styleUrls: ["./comandas.component.scss"],
})
export class ComandasComponent implements OnInit {
  productos: Producto[];
  mesas: Mesa[]; 
  mesa: string;
  tipo: string;
  especialidad:string;
  nombre:string;
  constructor(private servicioProductos: ServicioProductosService,private servicioMesas:ServicioMesasService) {}

  ngOnInit(): void {
    this.servicioProductos.obtenerProductos().subscribe((response) => {
      console.log(response);
      this.productos = (response as datosProductos).data;
    });
    this.servicioMesas.obtenerMesas().subscribe((response) => {
      console.log(response);
      this.mesas = (response as datosMesas).data;
    });
  }
  seleccionarMesa(id){
    this.mesa = id;
    console.log(this.mesa);    
    document.getElementById('mesas').style.display="none";
    document.getElementById('categorias').style.display="flex";
    
  }
  
  categoria(event){
    this.tipo = event.target.id;
    document.getElementById('especialidad').style.display="flex";
    let comidas=document.getElementsByClassName("comida") as HTMLCollectionOf<HTMLElement>;
    let bebidas=document.getElementsByClassName("bebida") as HTMLCollectionOf<HTMLElement>;

    if(this.tipo=="tapa" || this.tipo=="racion" || this.tipo=="entrante"){
      comidas[0].style.display="flex";
      comidas[1].style.display="flex";
      comidas[2].style.display="flex";
      bebidas[0].style.display="none";
      bebidas[1].style.display="none";
    }
    else if(this.tipo=="bebida"){
      comidas[0].style.display="none";
      comidas[1].style.display="none";
      comidas[2].style.display="none";
      bebidas[0].style.display="flex";
      bebidas[1].style.display="flex";
    }
    else{
      comidas[0].style.display="none";
      comidas[1].style.display="none";
      comidas[2].style.display="none";
      bebidas[0].style.display="none";
      bebidas[1].style.display="none";
      this.especialidad='postre';
    }
    console.log(this.tipo);
  }
  contenido(event){
    this.especialidad = event.target.id;
    document.getElementById('productos').style.display="flex";

  }
  generarProductoPedido(event){
    this.nombre = event.target.innerHTML;
    console.log(event.target.innerHTML);

  }
  prueba()
  {
    console.log("Tipos: "+this.tipo+" Especialidad: "+this.especialidad+"  Nombre"+this.nombre);
  }
}
