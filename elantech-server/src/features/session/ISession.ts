interface ISession {
    uuid: string
    userId?: number
    active?: boolean
    expired?: boolean
    expiresAt?: Date
    UserType?: {value: any}
}

export default ISession;
