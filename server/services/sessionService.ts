import { CompatibilityEvent } from "h3";
import { createSession, getSessionByAuthToken, getSessionById } from "../db/repositories/sessionRepository";
import { IUser } from "~~/types/IUser";
import { v4 as uuidv4 } from "uuid";
import { sanitizeUserForFrontend } from "./userService";
import { userModel } from "../db/models/userModel";
import { ISession } from "~~/types/iSession";

export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser> {
    let uModel = await userModel.findById(user.id);
    let session;
    const authToken = uuidv4().replaceAll("-", "");
    if (uModel.session) {
       session = await getSessionById(uModel.session)
       session.authToken = authToken;
       session.user = user; 
    
       await session.save();
    } else {
        session = await createSession({ authToken, user });
    }
    uModel.session = session._id;
    await uModel.save();
    if (user.id) {
        setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true, secure: true });
        const user = getUserBySessionToken(authToken);
        return user;
    }
    throw Error("error creating session");
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken);
    return sanitizeUserForFrontend(session.user);
}
