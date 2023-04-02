interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: string;
    sold: boolean;
    numberOfProducts?: number;
    quoter?: string;
    totalQuote?: number;
    companyName?: string;
}

export default IQuote;
