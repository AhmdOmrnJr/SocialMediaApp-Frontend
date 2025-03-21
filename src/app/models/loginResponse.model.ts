export interface LoginResponse {
    isSuccess: boolean,
    message?: string,
    result?: {
        firstName: string,
        token: string
    },
    errors?: any
}