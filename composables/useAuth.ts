import { ISession } from "../types/iSession";
export async function registerWithEmail(username: string, name: string, email: string, password: string) {
    try {
        const res = await $fetch<ISession>("/api/auth/register", {
            method: "POST",
            body: { username, name, email, password },
        });
        if (res) {
            useState("user").value = res;
            await useRouter().push("./dashboard");
        }
    } catch (e) {
        console.log("error" + e.toString());
    }
}