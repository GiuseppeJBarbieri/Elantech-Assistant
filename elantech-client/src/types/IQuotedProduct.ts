// Objective: Define the interface for the QuotedProduct entity.
interface IQuotedProduct {
    id?: number;
    quoteId: number;
    productId: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
    Product?: {
        productNumber: string,
        productType: string,
        brand: string,
        description: string
    };
    Quote: {
        dateQuoted: string,
        sold: boolean,
        Company?: {
            name: string,
            representative: string
        },
        User?: {
            firstName: string,
            lastName: string
        }
    };
}

export default IQuotedProduct;
