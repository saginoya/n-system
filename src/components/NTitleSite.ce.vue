<script setup lang="ts">
defineProps<{
  titleList: string[]
}>()
</script>

<template>
  <h1 class="m-0 border border-current pb-4 leading-5 tracking-normal">
    <span v-for="(title, index) in titleList" :key="index">
      {{ title }}
    </span>
  </h1>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
