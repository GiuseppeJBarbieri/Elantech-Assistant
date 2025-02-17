import IReceiving from '../receiving/IReceiving';
import IRemovedInventory from '../removedInventory/IRemovedInventory';

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
    removedInventory?: IRemovedInventory;
    receiving?: IReceiving;
}

export default IInventory;
