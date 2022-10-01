import { CompatibilityEvent, setCookie } from "h3";

export default async (event: CompatibilityEvent) => {
    return setCookie(event, "auth_token", null)
}