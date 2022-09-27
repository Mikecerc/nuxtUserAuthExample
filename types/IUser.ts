import { ISession } from "./iSession";
export interface IUser {
    id? :number;
    username: string;
    name? : string;
    loginType?: string;
    password?: string;
    email?: string;
    avatarUrl? : string
    session? : ISession;
}