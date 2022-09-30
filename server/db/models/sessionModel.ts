import mongoose from "mongoose";
import { ISession } from "~~/types/iSession";
import { userSchema } from "./userModel";
export const sessionSchema = new mongoose.Schema<ISession>({
    authToken: String,
    user: userSchema,
});
export const sessionModel = mongoose.model<ISession>("Session", sessionSchema, "sessions");