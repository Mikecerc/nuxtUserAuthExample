import { sanitizeUserForFrontend } from "~~/server/services/userService";
import { compare } from "~~/server/services/passwordService";
import { getUserByEmail } from "~~/server/db/repositories/userRepository";
import { CompatibilityEvent, sendError } from "h3";
import { makeSession } from "~~/server/services/sessionService";

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event);
    const email: string = body.email;
    const password: string = body.password;
    const user = await getUserByEmail(email);

    if (user === null) {
        return sendError(event, createError({ statusCode: 401, statusMessage: "unauthenticated" }));
    }
    const isPasswordCorrect: boolean = compare(password, user.password.hash, user.password.salt);
    if (!isPasswordCorrect) {
        return sendError(event, createError({ statusCode: 401, statusMessage: "unauthenticated" }));
    }
    await makeSession(user, event);
    return sanitizeUserForFrontend(user);
}