interface IQuotedProduct {
    id?: number;
    quoteId?: number;
    productId: number;
    orderId?: number;
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
