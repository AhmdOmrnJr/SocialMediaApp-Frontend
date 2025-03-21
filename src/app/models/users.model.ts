import { Member } from "./member.model"


export interface Users {
    isSuccess: boolean
    message: any
    result?: Member[]
    errors: any
}
