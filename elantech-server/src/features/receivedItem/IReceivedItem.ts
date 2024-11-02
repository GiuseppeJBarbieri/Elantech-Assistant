interface IReceivedItem {
    id?: number;
    receivingId: number;
    productId: number;
    quantity: number;
    cud: string;
    comment: string;
    finishedAdding: boolean;
}

export default IReceivedItem;
