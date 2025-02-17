interface IUser {
    id?: number
    createdBy?: number
    editedBy?: number
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    userType?: {value: string}
    phoneNumber?: string
    userTypeId?: number
}

export default IUser;
