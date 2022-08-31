interface IInventory {
    serialNumber: string;
    productNumber: string;
    removedId: number;
    poNumber: string;
    condition: string;
    warrantyExpiration: Date;
    isTested: boolean;
    dateTested: Date;
    comment: string;
    location: string;
}

export default IInventory;
