import { validate } from "./validator";
import { IUser } from "~~/types/IUser";
import { getUserByEmail, getUserByUserName } from "../db/repositories/userRepository";
import { RegistationRequest } from "~~/types/IRegistration";
type existsCheck = {
    value: boolean;
    message?: string;
}
type RegistrationErrors = {
    emailError?: string;
    usernameError?: string;
}
export async function validateUser(data: RegistationRequest): Promise<FormValidation> {
    const errors = await validate(data);

    if(errors.size > 0) {
        return { hasErrors: true, errors };
    }
    return { hasErrors: false };
}
export async function doesUserExist(email: string, username: string): Promise<existsCheck> {
    const emailExists = await getUserByEmail(email);
    const usernameExists = await getUserByUserName(username);
    const errors: RegistrationErrors = {};
    if (emailExists) {
        errors.emailError = `The email ${email} is already registered`;
    }
    if (usernameExists) {
        errors.usernameError = `The username ${username} is already registered`;
    }
    if (emailExists || usernameExists) {
        const message = JSON.stringify(errors);
        return { value: true, message };
    }
    return { value: false };
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {
    if (!user) return user; 
    let sanitizedUser: IUser = {
        username: user.username,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        id: user.id,
    }
    return sanitizedUser; 
}