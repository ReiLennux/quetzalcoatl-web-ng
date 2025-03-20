export class Assets {
    Id!: number;
    Name!: string;
    Description!: string;
    Serial!: string;
    purchaseDate!: Date;
    providerId!: number;
    subsidiaryId!: number;
    start_date!: Date;
    end_date!: Date | undefined;
}
