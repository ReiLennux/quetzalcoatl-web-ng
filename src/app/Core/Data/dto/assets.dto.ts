export interface Assets {
    Name: string;
    Description: string;
    Serial: string;
    purchaseDate: Date;
    ProviderId: number;
    SubsidiaryId: number;
    start_date: Date;
    endDate: Date | undefined;
}

export const AssetsColumns = ["Nombre", "No serie", "Sucursal", "Fecha Inicio", "Fecha Fin","Detalles", "Editar", "Eliminar"];