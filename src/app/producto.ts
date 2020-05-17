export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
    especialidad: string;
    id_adm: number;
}

export interface datosProductos{
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Producto[];
}