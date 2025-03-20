export interface Providers {
    id: number;
    rfc: string;
    razon_social: string;
    address: string;
    phone: string;
    type: string;
    email: string;
    status: string;
    max_capacity: number;
    conditions: string;
}


export const ProvidersColumn = ["RFC", "Razon Social", "Tipo", "Correo", "Estado", "Detalles", "Editar", "Eliminr"];
