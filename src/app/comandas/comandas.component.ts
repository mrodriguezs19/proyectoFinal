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
  //Datos de la base de datos
  productos: Producto[];
  comandas: Comanda[];
  mesas: Mesa[];
  clientes: Cliente[];
  facturas: Factura[];
  productos_pedidos: ProductoPedido[];

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
    estado:"",
    enviado:'',
    id_empleado: 0,
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
    public router:Router,
    public location:Location
    
  ) {}



  ngOnInit(): void {
    this.servicioProductos.obtenerProductos().subscribe((response) => {
      this.productos = (response as datosProductos).data;
    });
    this.servicioMesas.obtenerMesas().subscribe((response) => {
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
    this.servicioProductosPedidos.obtenerProductosPedidos().subscribe((response) => {
      this.productos_pedidos = (response as datosProductoPedido).data;
    });
  }

  //SELECCIONAMOS MESA PARA ABRIR EL MENU DE GESTION DE ESTA MESA
  seleccionarMesa(id, i) {
    //Ocultamos mesas y enseñamos mesas el panel de gestion.
    document.getElementById("mesas").style.display = "none";
    document.getElementById("panel_mesa").style.display = "flex"; 

    this.mesa = id;
    this.n_mesa = i + 1;
    console.log(this.mesa);
    //Si la mesa está vacía , cambia su estado a llena.Se crea una comanda en la que se van incluyendo los productos pedidos
    //cuando el camarero elija, la cocina podrá ver esta comanda y se generara una nueva comanda al entrar en esta mesa AÑADIR
    let mesa = this.mesas.find((element) => element.id == this.mesa);
    if (mesa.estado == "vacio") {
      if (
        confirm(
          "¿Ocupar mesa?"
        )
      ) { mesa.estado = "lleno";

        this.cliente.id_mesa=this.mesa;
        this.servicioClientes.introducirCliente(this.cliente).subscribe();   
        
        this.servicioMesas.actualizarMesa(mesa).subscribe();
        //Creamos cliente en esta mesa*/
        this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        })
      }
      else{
        this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        })
      }
    }
    else{ // Si esta llena
// Si existe una comanda en proceso, this.comanda sera esta y si no , se creara una nueva añadiendole los datos necesarios.  
      this.cliente = this.clientes.find(
        (element) => element.id_mesa == this.mesa
      );
      if(this.comandas.find(
        (element) => element.id_cliente == this.cliente.id && element.estado=="enproceso"
      )==undefined){
        console.log("No existe una comanda en proceso para esta mesa, crear al añadir producto");
        
      }
      else{
        this.comanda = this.comandas.find(
          (element) => element.id_cliente == this.cliente.id && element.estado=="enproceso"
        );
        console.log("Si hay comanda en proceso en esta mesa "+this.comanda.id);
      }
      

    }
    
       

  }

  //PANEL DE GESTION DE LA MESA.
  //Si hay una comanda en proceso, se continua con esa.Si tiene solo comandas enviadas, se crea una nueva comanda
  //con estado enproceso, para trabajar con ella hasta mandarla a cocina.
  crearComanda() {
    document.getElementById("panel_mesa").style.display = "none";
    document.getElementById("categorias").style.display = "flex";
    //Buscamos cliente sentado en esa mesa
    
    this.cliente = this.clientes.find((element) => element.id_mesa == this.mesa);
    
    console.log("Cliente" + this.cliente.id);
    //Buscamos si hay una comanda para ese cliente con estado enproceso.
    let comanda = this.comandas.find(
      (element) => element.id_cliente == this.cliente.id && element.estado=="enproceso"
    );
    
    console.log("Comanda" + comanda);
    //Comprobamos si existe la comanda enproceso o o no .
    if (comanda == undefined) {
      console.log(
        "No existe una comanda para el cliente " +
          this.cliente.id +
          "Sentado en la mesa" +
          this.mesa
      );
      //Como no existe una comanda para esta mesa, creamos una e introducimos los datos de cliente , empleado que esta clickando y factura
      this.comanda.id_cliente = this.cliente.id;
      this.comanda.id_empleado = 2252	;
      console.log(this.comanda.id);
      //Comprobamos si el cliente tiene una factura, si no tiene crearemos una nueva factura donde meteremos todas las nuevas comandas,
      //si existe entonces pondremos en la comanda dicha id de la factura.
      let factura = this.facturas.find(
        (element) => element.id_cliente ==this.cliente.id
      );
      
      if (factura == undefined) {
        //Creamos la factura
        
        this.factura.id_cliente = this.cliente.id;   
       
        
        //Introducimos la factura
        console.log(this.factura);
        this.servicioFacturas.introducirFactura(this.factura).subscribe();
        
        if (
          confirm(
            "¿Desea realizar la primera comanda? Se recargarán los datos."
          )
        ) { 
            //Recargamos para tener una factura y ya en la siguiente entrada podremos crear la primera comanda en proceso
          this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
            console.log(decodeURI(this.location.path()));
            this.router.navigate([decodeURI(this.location.path())]);
            
          })
        }
       

      } //No existe una factura para este cliente

      else {
        if (
          confirm(
            "¿Añadir primer producto?"
          )
        ) { 
          //Buscamos la factura creada para este cliente para obtener id y añadirla a la comanda
        let factura = this.facturas.find(
          (element) => element.id_cliente == this.cliente.id
        );
        this.comanda.id_factura = factura.id;
        this.comanda.estado="enproceso";
        this.comanda.enviado="no";
        console.log("Empleado "+this.comanda.id_empleado);
        console.log("Factura +"+this.comanda.id_factura);
        console.log("Cliente +"+this.comanda.id_cliente);
        console.log("Estado +"+this.comanda.estado);
        console.log(this.comanda);
        this.servicioComandas.introducirComanda(this.comanda).subscribe();
        //Volvemos para actualizar
        this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        })
        }  
        else{
           //Cancelamos
        this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
          console.log(decodeURI(this.location.path()));
          this.router.navigate([decodeURI(this.location.path())]);
        })
        }      
       
        
        
      } //Existe una factura con otras comandas


    } //Si la comanda en proceso no existe
     

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
    this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    })
    
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
  generarProductoPedido(event) {
    this.nombre = event.target.innerHTML;
    let producto = this.productos.find(
      (element) => element.nombre == this.nombre
    );
    //Si existe ya un producto pedido de un producto en concreto , aumentamos su cantidad
    

    //let comanda = this.comandas.find();
  console.log("PRUEBA"+producto.id);
  console.log(this.mesa);
  console.log(this.cliente);
    this.producto_pedido.id_producto=producto.id;
  this.producto_pedido.id_comanda=this.comanda.id;
    console.log("Mesa:"+this.mesa);
    console.log("Comanda:"+this.comanda.id);
    console.log("Producto:"+this.producto_pedido);
    this.servicioProductosPedidos.introducirProductoPedido(this.producto_pedido).subscribe();
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
  enviarComanda(){
    let enviarComanda=this.comandas.find((element) => element.id == this.comanda.id);
    console.log(enviarComanda);
    enviarComanda.estado="enviado";
    this.servicioComandas.actualizarComanda(enviarComanda).subscribe();
    console.log("Comanda enviada a cocina");
    //Volvemos para actualizar
    this.router.navigateByUrl("/comandas",{skipLocationChange:true}).then(()=>{
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }
  pedirCuenta(){
    
  }
  prueba() {
    console.log(
      "Mesa: " +
        this.mesa +
        " Cliente: " +
        this.cliente.id +
        "  Comanda" +
        this.comanda.id 
    );
  }
}
