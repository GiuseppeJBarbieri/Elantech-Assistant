interface IQuote {
    id: number;
    companyId: number;
    userId: number;
    dateQuoted: string;
    sold: boolean;
    numberOfProducts?: string;
    quoter?: string;
    totalQuote?: number;
}

export default IQuote;
