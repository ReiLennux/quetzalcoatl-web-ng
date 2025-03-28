export interface Provider {
    proveedorId: number;
    nombre: string;
    tipo: string;
    direccion: string;
    telefono: string;
    email: string;
    fechaAlta: Date;
    fechaBaja?: Date;
    estatus: string;
}
