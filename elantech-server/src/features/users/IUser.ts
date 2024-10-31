interface IUser {
    id?: number
    userTypeId: number
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    phoneNumber?: string
    UserType?: {value: string}
}

export default IUser;
