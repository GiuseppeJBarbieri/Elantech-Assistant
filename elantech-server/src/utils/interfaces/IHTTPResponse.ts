interface IHTTPResponse {
    statusCode: number
    message?: string
    ip?: string
    id?: number
    payload?: any[]
}

export default IHTTPResponse;
