<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
  import { IUser } from './types/IUser';
  import { useUser } from './composables/useAuth';
  const user: IUser = await useUser();
</script>