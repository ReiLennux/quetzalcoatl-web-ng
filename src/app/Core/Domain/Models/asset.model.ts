export interface Asset {
    ActivoFijoID: number;
    Nombre: string;
    Descripcion: string;
    Serial: string;
    FechaCompra: Date;
    ProveedorID: number;
    SucursalID: number;
    FechaAlta: Date;
    FechaBaja?: Date;
    Estatus: string;
}