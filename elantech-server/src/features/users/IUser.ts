interface IUser {
    id?: number;
    createdBy?: number
    editedBy?: number
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    UserType?: {value: string}
}

export default IUser;
