import IQuotedProduct from "./IQuotedProduct";

interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: string;
    sold: boolean;
    User?: {firstName: string, lastName: string};
    QuotedProducts?: IQuotedProduct[];
}

export default IQuote;
