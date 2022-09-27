<script setup lang="ts">

</script>
<template>
    <div class="container">
        <nav class="nav">
            <nuxt-link to="/login">login</nuxt-link>
            <nuxt-link to="/register">register</nuxt-link>
            <nuxt-link to="/">home</nuxt-link>
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