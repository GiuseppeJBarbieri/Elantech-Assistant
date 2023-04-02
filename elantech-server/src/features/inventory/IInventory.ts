interface IInventory {
    id: number;
    productId: number;
    removedId?: number;
    poId?: number;
    serialNumber: string;
    condition: string;
    warrantyExpiration: string;
    isTested: boolean;
    dateTested: string;
    comment: string;
    location: string;
    // sellerName?: string;
    // orderNumber?: string;
    // dateReceived?: string;
}

export default IInventory;
