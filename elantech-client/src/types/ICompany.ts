interface ICompany {
    id?: number;
    userId?: number;
    type?: string;
    name?: string;
    representative?: string;
    phone?: string;
    email?: string;
    location?: string;
    comment?: string;
    user?: {
        firstName: string,
        lastName: string,
    };
}

export default ICompany;
