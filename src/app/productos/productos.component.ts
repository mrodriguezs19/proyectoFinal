import { Component, OnInit } from "@angular/core";
import { ServicioProductosService } from "../servicios/servicio-productos.service";
import { Producto, datosProductos } from "../interfaces/producto";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common"; 

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"],
})
export class ProductosComponent implements OnInit {
  //VARIABLES
  productos: Producto[];
  producto: Producto = {
    id: 0,
    nombre: "",
    precio: 0,
    tipo: "",
    especialidad: "",
    id_adm: 0,
  };

  form = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    tipo: new FormControl("", [Validators.required]),
    especialidad: new FormControl("", [Validators.required]),
    precio: new FormControl("", [Validators.required]),
  });
  pageActual: number = 1;
  filtroProducto = "";
  especialidades:number;

  //CONSTRUCTOR
  constructor(private servicioProductos: ServicioProductosService,public router:Router,public location:Location) {}

  //INICIO
  ngOnInit(): void {
    this.servicioProductos.obtenerProductos().subscribe((response) => {
      console.log(response);
      this.productos = (response as datosProductos).data;
    });
  }

  //FUNCIONES
  
  get nombre() {
    return this.form.get("nombre");
  }
  get tipo() {
    return this.form.get("tipo");
  }
  get especialidad() {
    return this.form.get("especialidad");
  }
  get precio() {
    return this.form.get("precio");
  }
  eliminar(id) {
    if (
      confirm(
        "Seguro que deseas eliminar el producto?"
      )
    ) {
      this.servicioProductos.eliminarProducto(id).subscribe();
      this.router.navigateByUrl("/productos",{skipLocationChange:true}).then(()=>{
        console.log(decodeURI(this.location.path()));
        this.router.navigate([decodeURI(this.location.path())]);
      })
    }
  }
  prueba: Producto;
  onSubmit() {
    let conseguido=false;
    this.producto.nombre = this.form.get("nombre").value;
    this.producto.tipo = this.form.get("tipo").value;
    this.producto.especialidad=this.form.get("especialidad").value;
    this.producto.precio = this.form.get("precio").value;
    this.producto.id_adm = 1551;
    console.log(this.producto);
   this.servicioProductos.introducirProducto(this.producto).subscribe(
    (response) => {
      console.log(response);
      this.prueba = (response as Producto);
    }
   );
  /*this.router.navigateByUrl("/productos",{skipLocationChange:true}).then(()=>{
    console.log(decodeURI(this.location.path()));
    this.router.navigate([decodeURI(this.location.path())]);
  })*/
  }
  mostrar() {
    console.log(this.prueba);
  }
  elegirTipo(event){
    console.log(event.target.options.selectedIndex);
    this.especialidades=event.target.options.selectedIndex;
  }
}
