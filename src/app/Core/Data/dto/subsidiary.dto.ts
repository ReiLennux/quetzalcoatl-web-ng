export interface Subsidiary {
    id: number;
    key: string;
    address: string;
    manager: string;
    phone: string;
    status: string;
    email: string;
    type: string;
}

export const SubsidiaryColumn = ["Clave", "Direccion", "Gerente", "Telefono", "Estado", "Correo", "Tipo", "Editar", "Eliminar"];
