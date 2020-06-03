export interface Empleado {
  id: number;
  dni: string;
  nombre_completo: string;
  correo: string;
  contrasena: string;
  sueldo: number;
  puesto: string;
  id_adm: number;
  created_at: Date;
  updated_at: Date;
}

export interface datosEmpleados {
  status: string;
  siguiente?: any;
  anterior?: any;
  data: Empleado[];
}
