<template>
   <div>
      <div>get number</div>
      <button>number</button>
      <div>number: {{number}}</div>
   </div> 
</template>
<script setup lang="ts">

   definePageMeta({
        middleware: "auth"
    });
   let number = ref(null);
   const getNumber = async () => {
      return await $fetch<string>('/api/getNumber');
   }
   number.value = await getNumber();
</script>