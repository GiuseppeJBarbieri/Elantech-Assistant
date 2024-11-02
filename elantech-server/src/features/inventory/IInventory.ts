interface IInventory {
    id: number;
    productId: number;
    removedInventoryId: number;
    purchaseOrderId: number;
    serialNumber: string;
    condition: string;
    warrantyExpiration: Date;
    tested: boolean;
    testedDate: Date;
    comment: string;
    location: string;
}

export default IInventory;
