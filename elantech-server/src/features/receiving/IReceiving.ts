interface IReceiving {
    poNumber: number;
    companyId: number;
    userId: number;
    shippingType: string;
    orderType: string;
    trackingNumber: string;
    dateReceiving: Date;
}

export default IReceiving;
