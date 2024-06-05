<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a class="inline-block rounded px-2" :href>
    <slot />
  </a>
</template>

<style scoped>
@import url(@/assets/css/main.css);
</style>
