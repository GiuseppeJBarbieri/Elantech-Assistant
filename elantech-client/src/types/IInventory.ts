interface IInventory {
    id: number;
    productId: number;
    removedInventoryId?: number;
    purchaseOrderId?: number;
    serialNumber: string;
    condition: string;
    warrantyExpiration: string;
    tested: boolean;
    testedDate: string;
    comment: string;
    location: string;
}

export default IInventory;
