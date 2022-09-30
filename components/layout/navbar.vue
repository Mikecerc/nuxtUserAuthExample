<script setup lang="ts">
import { userLogout } from "~/composables/useAuth";
import { IUser } from "~~/types/IUser";
const logout = userLogout
const router = useRouter()
const userAcc = useState<IUser>('user'); 
</script>
<template>
    <div class="container">
        <nav class="nav">
            <nuxt-link to="/login">login</nuxt-link>
            <nuxt-link to="/register">register</nuxt-link>
            <nuxt-link to="/">home</nuxt-link>
            <user v-if="userAcc" />
        </nav>
    </div>
</template>
<style lang="css">
    .nav {
        float: right;
        display: flex;
        gap: 30px;
        padding-right: 100px;
        padding-top: 15px;
    }
</style>