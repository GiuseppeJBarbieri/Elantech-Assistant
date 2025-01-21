import IReceiving from "./IReceiving";
import IRemovedInventory from "./IRemovedInventory";

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
    reserved: boolean;
    RemovedInventory?: IRemovedInventory;
    Receiving?: IReceiving;
}

export default IInventory;
