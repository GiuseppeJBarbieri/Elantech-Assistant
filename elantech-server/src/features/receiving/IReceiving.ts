import IReceivedItem from '../receivedItem/IReceivedItem';

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
    company?: {
        name: string,
    },
    user?: {
        firstName: string,
        lastName: string,
    }
    receivedItems?: IReceivedItem[];
}

export default IReceiving;
