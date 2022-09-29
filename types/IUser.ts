import mongoose from "mongoose";
import { ISession } from "./iSession";
import { IPassword } from "./IPassword";
export interface IUser {
    id? :mongoose.Types.ObjectId;
    username: string;
    name? : string;
    loginType?: string;
    password?: IPassword;
    email?: string;
    avatarUrl? : string
    session? : ISession;
}