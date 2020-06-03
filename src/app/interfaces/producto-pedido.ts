export interface ProductoPedido {
    id: number;
    id_producto:number;
    id_comanda: number;
    cantidad:number;
}
export interface datosProductoPedido{
    status: string;
    siguiente?: any;
    anterior?: any;
    data: ProductoPedido[];
}