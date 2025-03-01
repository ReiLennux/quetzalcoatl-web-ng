export interface Subsidiary {
    id: number;
    key: string;
    address: string;
    manager: string;
    phone: string;
    status: string;
    email: string;
    Type: string;
}

export const SubsidiaryColumns = ["Clave", "Direccion", "Gerente", "Telefono", "Estado", "Correo", "Tipo" ];
