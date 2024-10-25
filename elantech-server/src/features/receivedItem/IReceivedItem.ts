interface IReceivedItem {
    id?: number;
    shippingId: number;
    productId: number;
    cud: string;
    comment: string;
    finishedAdding: boolean;
}

export default IReceivedItem;
