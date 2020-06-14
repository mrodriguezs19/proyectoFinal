export interface Comanda {
    id: number;
    estado: string;
    enviado: string;
    listo:string;
    id_empleado: number;
    id_cliente: number;
    id_factura: number;
    created_at: Date;
    updated_at: Date;
}

export interface datosComanda {
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Comanda[];
}
