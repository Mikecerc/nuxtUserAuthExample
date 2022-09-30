<script setup lang="ts">
import { IUser } from "~/types/IUser";
import { userLogout } from "~/composables/useAuth";
const avatar = (given: string | undefined) => given ?? "/img/logo_short.png"; //
const user = useState<IUser>("user");
const logout = userLogout;
</script>
<template>
    <div>
        <div>logged in as {{ user.username }}</div>
        <button @click="logout">logout</button>
    </div>
</template>
