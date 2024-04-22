import { Artwork } from "../types/artwork"
import { User } from "../types/User"


export type PurchaseInfo={

    buyer: User,
    artwork: Artwork,
    amount: number
}