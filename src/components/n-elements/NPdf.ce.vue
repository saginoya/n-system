<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <embed :src type="application/pdf" class="size-full" />
</template>

<style>
@import url(@/assets/css/main.css);
</style>
