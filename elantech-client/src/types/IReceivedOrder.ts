interface IReceivedOrder {
    id?: number;
    poNumber: number;
    companyId: number;
    userId: number;
    shippingId: number;
    orderType: string;
    trackingNumber: string;
    dateReceived: Date;
    shippedVia: string;
}

export default IReceivedOrder;
