interface IInventory {
    id: number;
    productId: number;
    removedId?: number;
    poNumber?: string;
    serialNumber: string;
    condition: string;
    warrantyExpiration: string;
    isTested: boolean;
    dateTested: string;
    comment: string;
    location: string;
}

export default IInventory;
