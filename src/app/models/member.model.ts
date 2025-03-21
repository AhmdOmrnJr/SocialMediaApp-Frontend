import { Photo } from "./photo.model"

export interface Member {
    id: string
    userName: string
    photoUrl: string
    age: number
    knownAs: string
    createdOn: Date
    lastActive: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
}