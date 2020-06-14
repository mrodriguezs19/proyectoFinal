import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from "../servicios/servicio-productos.service";
import { Producto, datosProductos } from "../interfaces/producto";
import { ServicioMesasService } from "../servicios/servicio-mesas.service";
import { Mesa, datosMesas } from "../interfaces/mesa";
import { ServicioProductoPedidoService } from "../servicios/servicio-producto-pedido.service";
import { Comanda, datosComanda } from "../interfaces/comanda";
import { ServicioComandasService } from "../servicios/servicio-comandas.service";
import {
  ProductoPedido,
  datosProductoPedido,
} from "../interfaces/producto-pedido";

import { ServicioClientesService } from "../servicios/servicio-clientes.service";
import { Cliente, datosCliente } from "../interfaces/cliente";

import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {

  productos:Producto[];
  mesas:Mesa[];
  comandas:Comanda[];
  clientes:Cliente[];
  productos_pedidos:ProductoPedido[];
  constructor(
    private servicioProductos: ServicioProductosService,
    private servicioMesas: ServicioMesasService,
    private servicioProductosPedidos: ServicioProductoPedidoService,
    private servicioComandas: ServicioComandasService,
    private servicioClientes: ServicioClientesService,
    public router:Router,
    public location:Location   
    
  ) {}

  ngOnInit(): void {
    this.servicioProductos.obtenerProductos(Number(localStorage.getItem("id_adm"))).subscribe((response) => {
      this.productos = (response as datosProductos).data;
    });
    this.servicioMesas.obtenerMesas(Number(localStorage.getItem("id_adm"))).subscribe((response) => {
      this.mesas = (response as datosMesas).data;
    });
    this.servicioComandas.obtenerComandas().subscribe((response) => {
      this.comandas = (response as datosComanda).data;
      console.log(this.comandas);
    });
    this.servicioClientes.obtenerClientes().subscribe((response) => {
      this.clientes = (response as datosCliente).data;
    });
    this.servicioProductosPedidos.obtenerProductosPedidos().subscribe((response) => {
      this.productos_pedidos = (response as datosProductoPedido).data;
    });
  }
  //Se indica que la comanda esta lista para servir
  preparado(id){
    let enviarComanda=this.comandas.find((element) => element.id == id);
    
    enviarComanda.enviado="si";
    console.log(enviarComanda);
    this.servicioComandas.actualizarComanda(enviarComanda).subscribe((error)=>{console.log(error)});
    
  }
  //Mostrar comandas que hay que cocinar
  espera(){
    document.getElementById("botones").style.display = "none";
    document.getElementById("espera").style.display = "flex";

  }
  //Se indica que la comanda ya ha sido entregada al cliente
  terminada(id){
    let comanda=this.comandas.find((element) => element.id == id);
    comanda.listo="si";
    console.log(comanda);
    this.servicioComandas.actualizarComanda(comanda).subscribe((error)=>{console.log(error)});
    
  }
  //Mostrar comandas listas para enviar
  finalizar(){
    document.getElementById("botones").style.display = "none";
    document.getElementById("lista").style.display = "flex";

  }
  //Volver panel
  volver(){
    this.router.navigateByUrl("/cocina",{skipLocationChange:true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
          }
        )
  }
  
  
}
