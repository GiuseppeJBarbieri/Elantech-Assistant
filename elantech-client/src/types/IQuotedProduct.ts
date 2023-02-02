interface IQuotedProduct {
    id?: number;
    quoteID?: number;
    productID: number;
    orderID?: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
    productNumber?: string;
    type?: string;
    brand?: string;
    description?: string;
}

export default IQuotedProduct;
