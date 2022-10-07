import { IUser } from "~~/types/IUser";
import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import { CompatibilityEvent } from "h3";

export default defineEventHandler<IUser>(async (event: CompatibilityEvent) => {
    const authToken = getCookie(event.req, "auth_token");
    const user: IUser | "401" = await getUserBySessionToken(authToken);
    if (user instanceof IUser) {

    }
})