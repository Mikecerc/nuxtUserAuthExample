import mongoose from "mongoose";
import { ISession } from "~~/types/iSession";
import { IUser } from "~~/types/IUser";
import { sessionModel } from "../models/sessionModel";

export async function createSession(data: ISession): Promise<ISession> {
    return await new sessionModel(data).save();
}
export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
    const session: ISession = await sessionModel.findOne({ authToken: authToken }) as ISession;
    return session;
}
export async function getUserByAuthToken(authToken: string): Promise<IUser> {
    return await sessionModel.findOne({ authToken: authToken })
}
export async function getSessionById(id: mongoose.Schema.Types.ObjectId): Promise<ISession> {
    return await sessionModel.findById(id);

}