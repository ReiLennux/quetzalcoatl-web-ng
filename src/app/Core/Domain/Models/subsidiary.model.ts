export interface Subsidiary {
    SucursalId: number;
    Nombre: string;
    Direccion: string;
    Ciudad: string;
    Estado: string;
    Pais: string;
    CodigoPostal: string;
    Latitud: number;
    Longitud: number;
    FechaAlta: Date;
    FechaBaja?: Date;
    Estatus: string;
}
