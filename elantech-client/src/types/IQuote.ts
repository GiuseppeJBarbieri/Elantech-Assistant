interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: string;
    sold: boolean;
}

export default IQuote;
