export interface Subsidiary {
    sucursalId: number;
    nombre: string;
    direccion: string;
    estatus: string;

    ciudad: string;
    estado: string;
    pais: string;
    codigoPostal: string;
    latitud: number;
    longitud: number;
    
    fechaAlta: Date;
    fechaBaja?: Date;
}
