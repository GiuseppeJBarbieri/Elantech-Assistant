interface IQuotedProduct {
    id?: number;
    quoteId: number;
    productId: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
}

export default IQuotedProduct;
