import IQuotedProduct from "./IQuotedProduct";

interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: string;
    sold: boolean;
    user?: {firstName: string, lastName: string};
    quotedProducts?: IQuotedProduct[];
}

export default IQuote;
