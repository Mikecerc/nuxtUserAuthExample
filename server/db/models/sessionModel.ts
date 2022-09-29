import mongoose from "mongoose";
import { ISession } from "~~/types/iSession";
export const sessionSchema = new mongoose.Schema<ISession>({
    authToken: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'userSchema' },
});
export const sessionModel = mongoose.model<ISession>("Session", sessionSchema, "sessions");