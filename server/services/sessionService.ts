import { CompatibilityEvent } from "h3";
import { createSession, getSessionByAuthToken, getSessionById } from "../db/repositories/sessionRepository";
import { IUser } from "~~/types/IUser";
import { sanitizeUserForFrontend } from "./userService";
import { userModel } from "../db/models/userModel";
import { ISession } from "~~/types/iSession";
import { getToken } from "./jwtService";
import { verify } from "./jwtService";

export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser | "401"> {
    let uModel = await userModel.findById(user.id);
    let session;
    const authToken: string = await getToken(user.id.toString(), "refresh");
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

export async function getUserBySessionToken(authToken: string): Promise<IUser | "401"> {
    const decoded = verify(authToken);
    if (decoded) {
        const session = await getSessionByAuthToken(authToken);
        if (session) {
            const user = sanitizeUserForFrontend(session.user);
            return user;
        } else { 
            return "401";
        }
    } else {
        return "401"
    }
}
