import IRemovedInventory from "./IRemovedInventory";

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
    reserved: boolean;
    RemovedInventory?: IRemovedInventory;
}

export default IInventory;
