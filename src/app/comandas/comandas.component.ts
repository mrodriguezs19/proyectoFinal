import { Component, OnInit } from "@angular/core";
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
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PdfMakeWrapper } from "pdfmake-wrapper";
import { Txt, Table, Cell } from "pdfmake-wrapper";

import pdfFonts from "pdfmake/build/vfs_fonts";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ServicioClientesService } from "../servicios/servicio-clientes.service";
import { Cliente, datosCliente } from "../interfaces/cliente";
import { Factura, datosFactura } from "../interfaces/factura";
import { ServicioFacturasService } from "../servicios/servicio-facturas.service";

@Component({
  selector: "app-comandas",
  templateUrl: "./comandas.component.html",
  styleUrls: ["./comandas.component.scss"],
})
export class ComandasComponent implements OnInit {
  //Variables
  //Formulario mesas
  form = new FormGroup({
    sillas: new FormControl("", [Validators.required]),
  });
  //Datos de la base de datos
  productos: Producto[];
  comandas: Comanda[];
  mesas: Mesa[];
  clientes: Cliente[];
  facturas: Factura[];
  productos_pedidos: ProductoPedido[];

  //Para comprobar que existe la comanda
  comprobacion: Comanda;
  //Datos del producto pedido que se esta generando
  tipo: string;
  especialidad: string;
  nombre: string;
  //Datos de la mesa actual
  mesa: number;
  n_mesa: number;
  mesa_actual: Mesa = {
    id: 0,
    sillas: 0,
    estado: "",
    id_adm: 0,
  };
  //Valores predeterminados para cada tipo de dato
  producto_pedido: ProductoPedido = {
    id: 0,
    id_producto: 0,
    id_comanda: 0,
    cantidad: 1,
  };
  comanda: Comanda = {
    id: 0,
    estado: "",
    enviado: "",
    listo: "no",
    id_empleado: 1,
    id_cliente: 0,
    id_factura: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  cliente: Cliente = {
    id: 0,
    id_mesa: 0,
  };
  factura: Factura = {
    id: 0,
    id_cliente: 0,
    cuenta: 1,
    pagado: "no",
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(
    private servicioProductos: ServicioProductosService,
    private servicioMesas: ServicioMesasService,
    private servicioProductosPedidos: ServicioProductoPedidoService,
    private servicioComandas: ServicioComandasService,
    private servicioClientes: ServicioClientesService,
    private servicioFacturas: ServicioFacturasService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.servicioProductos
      .obtenerProductos(Number(localStorage.getItem("id_adm")))
      .subscribe((response) => {
        this.productos = (response as datosProductos).data;
      });
    this.servicioMesas
      .obtenerMesas(Number(localStorage.getItem("id_adm")))
      .subscribe((response) => {
        this.mesas = (response as datosMesas).data;
      });
    this.servicioComandas.obtenerComandas().subscribe((response) => {
      this.comandas = (response as datosComanda).data;
    });
    this.servicioClientes.obtenerClientes().subscribe((response) => {
      this.clientes = (response as datosCliente).data;
    });
    this.servicioFacturas.obtenerFacturas().subscribe((response) => {
      this.facturas = (response as datosFactura).data;
    });
    this.servicioProductosPedidos
      .obtenerProductosPedidos()
      .subscribe((response) => {
        this.productos_pedidos = (response as datosProductoPedido).data;
      });
  }
  //Funcion formulario sillas
  get sillas() {
    return this.form.get("sillas");
  }
  //SELECCIONAMOS MESA PARA ABRIR EL MENU DE GESTION DE ESTA MESA
  seleccionarMesa(id, i) {
    this.mesa = id;
    this.n_mesa = i + 1;
    console.log(this.mesa);
    //Si la mesa está vacía , cambia su estado a llena.Se crea una comanda en la que se van incluyendo los productos pedidos
    //cuando el camarero elija, la cocina podrá ver esta comanda y se generara una nueva comanda al entrar en esta mesa AÑADIR
    let mesa = this.mesas.find((element) => element.id == this.mesa);
    if (mesa.estado == "vacio") {
      if (confirm("¿Ocupar mesa?")) {
        mesa.estado = "lleno";

        this.cliente.id_mesa = this.mesa;

        this.servicioMesas.actualizarMesa(mesa).subscribe();
        //Incluimos nuevo cliente con su factura
        this.servicioClientes
          .introducirCliente(this.cliente)
          .subscribe((response) => {
            console.log(response);
            this.cliente = response as Cliente;
            console.log("Añadido" + this.cliente.id);
            console.log(
              "Ahora generamos la factura donde incluiremos las comandas"
            );
            this.factura.id_cliente = this.cliente.id;
            this.servicioFacturas
              .introducirFactura(this.factura)
              .subscribe((response) => {
                console.log(response);
                this.factura = response as Factura;
                console.log(
                  "Añadido" +
                    this.factura.id +
                    "del cliente" +
                    this.cliente.id +
                    "a esta mesa " +
                    this.mesa
                );
                //Recargamos
                this.router
                  .navigateByUrl("/comandas", { skipLocationChange: true })
                  .then(() => {
                    console.log(decodeURI(this.location.path()));
                    this.router.navigate([decodeURI(this.location.path())]);
                  });
              });
          });
      } else {
      }
    } else {
      // Si esta llena
      //Ocultamos mesas y enseñamos mesas el panel de gestion.
      document.getElementById("mesas").style.display = "none";
      document.getElementById("panel_mesa").style.display = "flex";

      // Si existe una comanda en proceso, this.comanda sera esta y si no , se creara una nueva añadiendole los datos necesarios.
      //Buscamos cliente sentado en esa mesa
      this.cliente = this.clientes.find(
        (element) => element.id_mesa == this.mesa
      );
      console.log("Cliente" + this.cliente.id);
      if (
        this.comandas.find(
          (element) =>
            element.id_cliente == this.cliente.id &&
            element.estado == "enproceso"
        ) == undefined
      ) {
        console.log(
          "No existe una comanda en proceso para esta mesa, vamos a crearla"
        );
        //Creamos una nueva comanda

        //Buscamos factura de este cliente
        this.factura = this.facturas.find(
          (element) => element.id_cliente == this.cliente.id
        );
        console.log("Factura" + this.factura.id);

        //Añadimos datos de la comanda
        this.comanda.id_cliente = this.cliente.id;

        this.comanda.id_factura = this.factura.id;
        this.comanda.estado = "enproceso";
        this.comanda.enviado = "no";
        console.log("Empleado " + this.comanda.id_empleado);
        console.log("Factura +" + this.comanda.id_factura);
        console.log("Cliente +" + this.comanda.id_cliente);
        console.log("Estado +" + this.comanda.estado);
        console.log("Enviado +" + this.comanda.enviado);
        this.servicioComandas
          .introducirComanda(this.comanda)
          .subscribe((response) => {
            console.log(response);
            this.comanda = response as Comanda;
            this.servicioComandas.obtenerComandas().subscribe((response) => {
              this.comandas = (response as datosComanda).data;
            });

            console.log(
              "La comanda ha sido introducida y es " + this.comanda.id
            );
            
            
          });
      } else {
        this.comanda = this.comandas.find(
          (element) =>
            element.id_cliente == this.cliente.id &&
            element.estado == "enproceso"
        );
        console.log(
          "Si hay comanda en proceso en esta mesa " + this.comanda.id
        );
      }
    }
  }

  //PANEL DE GESTION DE LA MESA.
  crearComanda() {
    document.getElementById("panel_mesa").style.display = "none";
    document.getElementById("categorias").style.display = "flex";
  }
  //Mostrar productos pedidos
  mostrar_pedidos() {
    this.servicioProductosPedidos
      .obtenerProductosPedidos()
      .subscribe((response) => {
        console.log(response);
        this.productos_pedidos = (response as datosProductoPedido).data;
      });
  }

  volverMesas() {
    /*document.getElementById("panel_mesa").style.display = "none";
    document.getElementById("categorias").style.display = "none";
    document.getElementById("especialidad").style.display = "none";
    document.getElementById("productos").style.display = "none";
    document.getElementById("mesas").style.display = "flex";*/
    this.router
      .navigateByUrl("/comandas", { skipLocationChange: true })
      .then(() => {
        console.log(decodeURI(this.location.path()));
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  //SUMAR O RESTAR UN PRODUCTO PEDIDO
  sumar(id) {
    let producto = this.productos_pedidos.find((element) => element.id == id);
    producto.cantidad += 1;
    this.servicioProductosPedidos
      .actualizarProductoPedido(producto)
      .subscribe();
  }
  restar(id) {
    let producto = this.productos_pedidos.find((element) => element.id == id);
    producto.cantidad -= 1;
    this.servicioProductosPedidos
      .actualizarProductoPedido(producto)
      .subscribe();
  }

  //PROCESO PARA INCLUIR PRODUCTOS A UNA COMANDA
  categoria(event) {
    this.tipo = event.target.id;
    document.getElementById("especialidad").style.display = "flex";

    //Cambiar color categoria seleccionada
    let categorias = document.querySelectorAll<HTMLInputElement>(
      "#categorias div"
    );
    for (var i = 0; i < categorias.length; i++) {
      if (categorias[i].id == this.tipo) {
        categorias[i].style.backgroundColor = "#247007";
      } else {
        categorias[i].style.background = "#56ab2f";
      }
    }

    let comidas = document.getElementsByClassName("comida") as HTMLCollectionOf<
      HTMLElement
    >;
    let bebidas = document.getElementsByClassName("bebida") as HTMLCollectionOf<
      HTMLElement
    >;
    let postres = document.getElementsByClassName("postre") as HTMLCollectionOf<
      HTMLElement
    >;

    if (
      this.tipo == "tapa" ||
      this.tipo == "racion" ||
      this.tipo == "entrante"
    ) {
      comidas[0].style.display = "flex";
      comidas[1].style.display = "flex";
      comidas[2].style.display = "flex";
      bebidas[0].style.display = "none";
      bebidas[1].style.display = "none";
      postres[0].style.display = "none";
      postres[1].style.display = "none";
    } else if (this.tipo == "bebida") {
      comidas[0].style.display = "none";
      comidas[1].style.display = "none";
      comidas[2].style.display = "none";
      bebidas[0].style.display = "flex";
      bebidas[1].style.display = "flex";
      postres[0].style.display = "none";
      postres[1].style.display = "none";
    } else {
      comidas[0].style.display = "none";
      comidas[1].style.display = "none";
      comidas[2].style.display = "none";
      bebidas[0].style.display = "none";
      bebidas[1].style.display = "none";
      postres[0].style.display = "flex";
      postres[1].style.display = "flex";
    }
    console.log(this.tipo);
  }
  contenido(event) {
    this.especialidad = event.target.id;
    document.getElementById("productos").style.display = "flex";
    //Cambiar color contenido seleccionado
    let contenido = document.querySelectorAll<HTMLInputElement>(
      "#especialidad div"
    );
    for (var i = 0; i < contenido.length; i++) {
      if (contenido[i].id == this.especialidad) {
        contenido[i].style.backgroundColor = "#247007";
      } else {
        contenido[i].style.background = "#56ab2f";
      }
    }
    console.log(this.especialidad);
  }

  //Generamos producto pedido para la comanda en proceso de esta mesa
  generarProductoPedido(id) {
    //Si existe ya un producto pedido de un producto en concreto , aumentamos su cantidad
    let repetido = this.productos_pedidos.find(
      (element) =>
        element.id_producto == id && element.id_comanda == this.comanda.id
    );
    if (repetido) {
      console.log("Ya existe este producto pedido");
      repetido.cantidad = repetido.cantidad + 1;
      this.servicioProductosPedidos
        .actualizarProductoPedido(repetido)
        .subscribe();
    } else {
      //Si no existe un producto pedido , lo añadimos
      console.log("PRUEBA" + id);
      console.log(this.mesa);
      console.log(this.cliente);

      this.producto_pedido.id_producto = id;
      this.producto_pedido.id_comanda = this.comanda.id;
      console.log("Mesa:" + this.mesa);
      console.log("Comanda:" + this.comanda.id);
      console.log("Producto:" + this.producto_pedido);

      this.servicioProductosPedidos
        .introducirProductoPedido(this.producto_pedido)
        .subscribe(() => {
          this.servicioProductosPedidos
            .obtenerProductosPedidos()
            .subscribe((response) => {
              this.productos_pedidos = (response as datosProductoPedido).data;
            });
        });
    }
    //let comanda = this.comandas.find();

    //Cambiar color categoria seleccionada
    /*let productos = document.querySelectorAll<HTMLInputElement>(
      "#productos div"
    );
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id == this.nombre) {
        productos[i].style.backgroundColor = "#247007";
      } else {
        productos[i].style.background = "#56ab2f";
      }
    }*/
  }
  enviarComanda() {
    let enviarComanda = this.comandas.find(
      (element) => element.id == this.comanda.id
    );
    let productoPedido = this.productos_pedidos.find(
      (element) => (element.id_comanda = this.comanda.id)
    );
    if (productoPedido === undefined) {
      alert("Esta comanda esta vacía");
    } else {
      console.log(enviarComanda);
      enviarComanda.estado = "enviado";
      this.servicioComandas.actualizarComanda(enviarComanda).subscribe();
      console.log("Comanda enviada a cocina");
      //Volvemos para actualizar
      this.router
        .navigateByUrl("/comandas", { skipLocationChange: true })
        .then(() => {
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        });
    }
  }
  pedirCuenta() {
    //Creacion de pdf
    var f = new Date().toLocaleString();
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.info({
      title: "Factura",
      author: "Kitchen-Manager",
    });
    pdf.header(f);
    let titulo = new Txt("Factura del cliente ")
      .alignment("center")
      .bold()
      .fontSize(30)
      .margin(30).end;

    pdf.add(titulo);
    let margen = new Txt(
      "Producto......................................................Precio"
    )
      .margin(30)
      .alignment("center").end;
    pdf.add(margen);

    let cuenta: number = 0;
    console.log(this.mesa);

    //Buscamos factura y cambiamos la cuenta
    let factura = this.facturas.find(
      (element) => element.id_cliente == this.cliente.id
    );
    console.log("Factura" + factura.id);
    for (let comanda of this.comandas) {
      if (comanda.id_factura == factura.id) {
        for (let producto of this.productos_pedidos) {
          if (producto.id_comanda == comanda.id) {
            let precio = this.productos.find(
              (element) => element.id == producto.id_producto
            );
            let fila = new Txt(
              precio.nombre +
                "....................................................." +
                producto.cantidad +
                "x" +
                precio.precio +
                "€"
            ).alignment("center").end;
            pdf.add(fila);
            cuenta = cuenta + precio.precio * producto.cantidad;
          }
        }
      }
    }
    let total = new Txt(
      "Total.................................." + cuenta + "€"
    )
      .alignment("center")
      .margin(30).end;
    pdf.add(total);
    pdf.create().open();
    //Alteramos estado de la factura
    factura.pagado = "si";
    factura.cuenta = cuenta - 1;
    this.servicioFacturas.actualizarFactura(factura).subscribe();
    //Eliminar todas las comandas de esta factura
    this.servicioComandas.obtenerComandas().subscribe((response)=>{
      for (let comanda of this.comandas) {
        if (comanda.id_factura == factura.id) {
          this.servicioComandas.eliminarComandas(comanda.id).subscribe();
        }
      }
    });
    
    //Buscamos la mesa para alterar su estado
    let mesa = this.mesas.find((element) => (element.id = this.mesa));
    mesa.estado = "vacio";
    this.servicioMesas.actualizarMesa(mesa).subscribe((response) => {
      //Volvemos para actualizar
      this.router
        .navigateByUrl("/comandas", { skipLocationChange: true })
        .then(() => {
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        });
    });
  }
  onSubmit() {
    this.mesa_actual.estado = "vacio";
    this.mesa_actual.id_adm = Number(localStorage.getItem("id_adm"));
    this.mesa_actual.sillas = this.form.get("sillas").value;
    console.log(this.mesa_actual.sillas);
    this.servicioMesas.introducirMesa(this.mesa_actual).subscribe();
  }
  prueba() {}
}
