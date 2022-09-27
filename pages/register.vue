<script setup lang="ts">
import { ref } from "vue";
import { registerWithEmail } from "~/composables/useAuth";
const email = ref(null);
const password = ref(null);
const username = ref(null);
const name = ref(null);
const hasError = ref(null);
const errorMessage = ref(null);

const postRegisterForm = async () => {
    await registerWithEmail(username.value, name.value, email.value, password.value);
};
</script>
<template>
    <div id="login-box">
        <div class="left">
            <h1>Sign up</h1>

            <input v-model="username" type="text" name="username" placeholder="Username" />
            <input v-model="email"  type="text" name="email" placeholder="E-mail" />
            <input v-model="password" type="password" name="password" placeholder="Password" />
            <input v-model="name" type="password" name="password2" placeholder="Name" />

            <button @click="postRegisterForm()">BUTTON!</button>
        </div>

        
    </div>
</template>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500);
*:focus {
    outline: none;
}

body {
    margin: 0;
    padding: 0;
    background: #ddd;
    font-size: 16px;
    color: #222;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
}

#login-box {
    top: 100px;
    left: 20%;
    position: absolute;
    margin: 5% auto;
    width: 300px;
    height: 400px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.left {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 40px;
    width: 300px;
    height: 400px;
}

h1 {
    margin: 0 0 20px 0;
    font-weight: 300;
    font-size: 28px;
}

input[type="text"],
input[type="password"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #aaa;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 15px;
    transition: 0.2s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-bottom: 2px solid #16a085;
    color: #16a085;
    transition: 0.2s ease;
}

input[type="submit"] {
    margin-top: 28px;
    width: 120px;
    height: 32px;
    background: #16a085;
    border: none;
    border-radius: 2px;
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    transition: 0.1s ease;
    cursor: pointer;
}

input[type="submit"]:hover,
input[type="submit"]:focus {
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
}

input[type="submit"]:active {
    opacity: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
}


</style>
