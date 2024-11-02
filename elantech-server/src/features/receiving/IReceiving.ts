interface IReceiving {
    id?: number;
    companyId: number;
    userId: number;
    purchaseOrderNumber: string;
    orderType: string;
    trackingNumber: string;
    dateReceived: Date;
    shippedVia: string;
    comment: string;
}

export default IReceiving;
