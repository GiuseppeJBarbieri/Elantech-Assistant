interface IProduct {
    quantity?: number;
    productNumber: string;
    productType: string;
    brand: string;
    description: string;
    lastAdded: string; // should be date
    alt1?: string;
    alt2?: string;
    alt3?: string;
    alt4?: string;
    ebayLink?: string;
    websiteLink?: string;
    quickSpecs?: string;
    relatedTags?: string;
}

export default IProduct;
