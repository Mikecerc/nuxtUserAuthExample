import { CompatibilityEvent } from "h3";
import { createSession, getSessionByAuthToken } from "../db/repositories/sessionRepository";
import { IUser } from "~~/types/IUser";
import { v4 as uuidv4 } from "uuid";
import { sanitizeUserForFrontend } from "./userService";
import { userModel } from "../db/models/userModel";

export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser> {
    const authToken = uuidv4().replaceAll('-', '');
    const session = await createSession({ authToken, user});
    let uModel = await userModel.findById(user.id); 
    uModel.session = session._id; 
    uModel.save()
    if(user.id) {
        setCookie(event, "auth_token", authToken, { path: '/', httpOnly: true, secure: true });
        return getUserBySessionToken(authToken);
    }
    throw Error("error creating session")
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken);
    return sanitizeUserForFrontend(session.user);
}