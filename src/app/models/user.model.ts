import { Member } from "./member.model";

export interface User {
    isSuccess: boolean,
    message?: string,
    result?: Member,
    errors?: any
}
