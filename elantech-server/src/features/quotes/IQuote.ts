import IQuotedProduct from '../quotedProducts/IQuotedProduct';

interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: Date;
    sold: boolean;
    /// Extra fields
    User?: {firstName: string, lastName: string};
    QuotedProducts?: IQuotedProduct[];
}

export default IQuote;
