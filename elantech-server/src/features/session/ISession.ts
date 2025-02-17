interface ISession {
    uuid: string
    userId?: number
    active?: boolean
    expired?: boolean
    expiresAt?: Date
    user?: { userTypeId: number }
}

export default ISession;
