export interface Administrador {
    id: number;
    usuario: string;
    nombre_completo: string;
    correo: string;
    contrasena: string;
    created_at: Date;
    updated_at: Date;
}

export interface datosAdministrador {
    status: string;
    siguiente?: any;
    anterior?: any;
    data: Administrador[];
}

