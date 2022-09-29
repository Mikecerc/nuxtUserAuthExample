import mongoose from 'mongoose';
import { IUser } from '~~/types/IUser';
export const userSchema = new mongoose.Schema<IUser>({
    loginType : String,
    password: {
        salt: String,
        hash: String,
        iterations: Number
    },
    email: String,
    name: String,
    username: String,
    session: { type: mongoose.SchemaTypes.ObjectId, ref: 'sessionSchema' },
});

export const userModel = mongoose.model<IUser>('User', userSchema, 'users'); 