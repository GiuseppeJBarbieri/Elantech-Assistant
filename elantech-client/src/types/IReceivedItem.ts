interface IReceivedItem {
    id?: number;
    receivingId: number;
    productId: number;
    quantity: number;
    cud: string;
    comment: string;
    finishedAdding: boolean;
    Product?: {
        productNumber: string;
        type: string;
        brand: string;
        description: string;
    };
}

export default IReceivedItem;
