interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: Date;
    sold: boolean;
}

export default IQuote;
