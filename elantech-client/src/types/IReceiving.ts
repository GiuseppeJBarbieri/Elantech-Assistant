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
    Company?: {
        name: string,
    },
    User?: {
        firstName: string,
        lastName: string,
    }
}

export default IReceiving;
