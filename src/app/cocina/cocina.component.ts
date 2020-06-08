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
    });
    this.servicioClientes.obtenerClientes().subscribe((response) => {
      this.clientes = (response as datosCliente).data;
    });
    this.servicioProductosPedidos.obtenerProductosPedidos().subscribe((response) => {
      this.productos_pedidos = (response as datosProductoPedido).data;
    });
  }
  preparado(id){
    let comandaEntregada=this.comandas.find((element) => element.id ==id);
    console.log(comandaEntregada.id);
   // enviarComanda.estado="enviado";
    //this.servicioComandas.actualizarComanda(enviarComanda).subscribe();
  }
  
}
