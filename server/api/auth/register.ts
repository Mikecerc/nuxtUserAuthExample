import { CompatibilityEvent } from "h3";
import { IUser } from "~~/types/IUser";
import { IPassword } from "~~/types/IPassword";
import { createUser } from "../../db/repositories/userRepository";
import { doesUserExist } from "~~/server/services/userService";
import crypto from 'crypto';
export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await useBody(event);
    const name: string = body.name;
    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;

    const userExists = await doesUserExist(email, username);
    if (userExists.value == true) {
        return sendError(event, createError({statusCode: 422, statusMessage: userExists.message}))
    }
    const hashedPassword = hashPassword(password);
    const userData: IUser = {
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
        loginType: 'email',
    }
    
    const user = await createUser(userData);
    //return await MakeSession(event, user);
}); 

function hashPassword(password: string): IPassword {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    let hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
    return {
        salt: salt,
        hash: hash.toString("hex"), 
        iterations: iterations,
    }
}