export interface Mesa {
    id: number;
    sillas: number;
    estado: string;
    id_adm: number;
}

export interface datosMesas {
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Mesa[];
}