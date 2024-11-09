interface ISession {
    uuid: string
    userId?: number
    active?: boolean
    expired?: boolean
    expiresAt?: Date
    User?: { userTypeId: number }
}

export default ISession;
