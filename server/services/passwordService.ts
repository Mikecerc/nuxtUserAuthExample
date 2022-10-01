import { StringLiteral } from "@babel/types";
import crypto from "crypto";
import { IPassword } from "~~/types/IPassword";
export function hashPassword(password: string): IPassword {
    var salt = crypto.randomBytes(128).toString("base64");
    var iterations = 10000;
    let hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512");
    return {
        salt: salt,
        hash: hash.toString("hex"),
        iterations: iterations,
    };
}
export function compare(password: string, hash: string, salt: string): boolean {
    var iterations = 10000;
    let hashed = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512");
    return hashed.toString("hex") == hash ? true : false;
}