import mongoose from "mongoose";
import { IUser } from "./IUser";

export interface ISession {
    _id?: mongoose.Schema.Types.ObjectId;
    authToken? : string;
    user? : IUser;
}