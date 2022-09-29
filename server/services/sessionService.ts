import { CompatibilityEvent } from "h3";
import { createSession, getSessionByAuthToken, getUserByAuthToken } from "../db/repositories/sessionRepository";
import { IUser } from "~~/types/IUser";
import { v4 as uuidv4 } from "uuid";

export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser> {
    const authToken = uuidv4().replaceAll('-', '');
    const session = await createSession({ authToken, user});

    if(user.id) {
        setCookie(event, "auth_token", authToken, { path: '/', httpOnly: true, secure: true });
        return getUserBySessionToken(authToken);
    }
    throw Error("error creating session")
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken);
    return session.user;
}