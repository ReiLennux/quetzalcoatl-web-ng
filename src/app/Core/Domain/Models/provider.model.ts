export interface Provider {
    ProveedorID: number;
    Nombre: string;
    Tipo: string;
    Direccion: string;
    Telefono: string;
    Email: string;
    Fechalta: Date;
    FechaBaja?: Date;
    Estatus: string;
}
