interface IInventory {
    serialNumber?: string;
    productNumber?: string;
    condition?: string;
    sellerName?: string;
    orderNumber?: string;
    dateReceived?: string;
    warrantyExpiration?: string;
    comment?: string;
    location?: string;
    tested?: string;
    reserved?: string;
}

export default IInventory;