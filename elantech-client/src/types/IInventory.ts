interface IInventory {
    id: number;
    productId: number;
    removedInventoryId?: number;
    poId?: number;
    serialNumber: string;
    condition: string;
    warrantyExpiration: string;
    isTested: boolean;
    dateTested: string;
    comment: string;
    location: string;
}

export default IInventory;
