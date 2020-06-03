export interface Cliente {
    id: number;
    id_mesa: number;
}

export interface datosCliente {
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Cliente[];
}