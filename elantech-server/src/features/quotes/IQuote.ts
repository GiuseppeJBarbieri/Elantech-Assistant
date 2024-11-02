interface IQuote {
    id?: number;
    companyId: number;
    userId: number;
    dateQuoted: Date;
    sold: boolean;
    /// Extra fields
    User?: {firstName: string, lastName: string};
    numberOfProducts?: number;
    totalQuote?: number;
}

export default IQuote;
