import IProduct from "./IProduct";

interface IReceivedItem {
    id?: number;
    receivingId: number;
    productId: number;
    quantity: number;
    /**
     * "Condition Upon Delivery"
     */
    cud: string;
    comment: string;
    finishedAdding: boolean;
    product?: IProduct;
}

export default IReceivedItem;
