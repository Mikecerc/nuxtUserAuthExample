import mongoose from 'mongoose';
import pkg from 'mongoose';
import { ISession } from '~~/types/iSession';
import { IUser } from '~~/types/IUser';
const { Schema, model, Types } = pkg;
export const userModel = model<IUser>("user", new Schema<IUser>({
    id: { type: Number, required: true },
    loginType : String,
    password: String,
    email: String,
    name: String,
    username: String,
    session: ISession},

}), "user")