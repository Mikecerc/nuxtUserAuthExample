import { CompatibilityEvent } from "h3";
import { IUser } from "~~/types/IUser";
import { IPassword } from "~~/types/IPassword";
import { createUser } from "../../db/repositories/userRepository";
import { validateUser } from "~~/server/services/userService";
import { makeSession } from "~~/server/services/sessionService";
import { RegistationRequest } from "~~/types/IRegistration";
import { hashPassword } from "~~/server/services/passwordService";
export default async (event: CompatibilityEvent) => {
    const body = await readBody(event)
  const data = body.data as RegistationRequest

  const validation = await validateUser(data)

  if (validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors))
    return sendError(event, createError({ statusCode: 422, data: errors }))
  }
    const hashedPassword: IPassword = hashPassword(data.password);
    const userData: IUser = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        loginType: "email",
    };

    /**const name: string = body.name;
    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;

    const userExists = await doesUserExist(email, username);
    if (userExists.value == true) {
        return sendError(event, createError({statusCode: 422, statusMessage: userExists.message}));
    }
    const hashedPassword = hashPassword(password);
    const userData: IUser = {
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
        loginType: 'email',
    }*/

    const user = await createUser(userData)

    return await makeSession(user, event)
};

