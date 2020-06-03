export interface Factura {
    id: number;
    cuenta: number;
    pagado: string;
    id_cliente: number;
    created_at: Date;
    updated_at: Date;
}

export interface datosFactura {
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Factura[];
}
