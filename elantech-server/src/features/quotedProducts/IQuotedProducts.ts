interface IQuotedProducts {
    id: number;
    quoteID: number;
    productID: number;
    orderID: number;
    quantity: number;
    quotedPrice: string;
    productCondition: string;
    comment: string;
}

export default IQuotedProducts;
