export interface Asset {
    activoFijoId: number;
    nombre: string;
    descripcion: string;
    serial: string;
    fechaCompra: Date;
    proveedor: string;
    sucursal: string;
    fechaAlta: Date;
    fechaBaja?: Date;
    estatus: string;
}