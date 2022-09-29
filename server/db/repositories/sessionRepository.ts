import { ISession } from "~~/types/iSession";
import { IUser } from "~~/types/IUser";
import { sessionModel } from "../models/sessionModel";

export async function createSession(data: ISession): Promise<ISession> {
    return await new sessionModel(data).save();
}
export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
    const user: IUser = await sessionModel.findOne({ authToken: authToken }) as IUser;
    return { authToken, user }
}
export async function getUserByAuthToken(authToken: string): Promise<IUser> {
    return await sessionModel.findOne({ authToken: authToken });
}