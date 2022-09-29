import { getUserByEmail, getUserByUserName } from "../db/repositories/userRepository";
type existsCheck = {
    value: boolean;
    message?: string;
}
type RegistrationErrors = {
    emailError?: string;
    usernameError?: string;
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

