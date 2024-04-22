import { User } from "./User";

export type Chat = {
    sender:User;
    text:string;
    time:string;
    artworkProject ?: string;
}