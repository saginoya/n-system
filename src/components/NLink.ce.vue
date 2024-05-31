<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a :href="href" class="text-primary"><slot /></a>
</template>

<style scoped>
@import url(@/assets/css/main.css);
</style>
