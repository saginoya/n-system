<script setup lang="ts">
import IconCheckCircle from './icons/IconCheckCircle.vue'
</script>

<template>
  <div class="flex items-center gap-2 text-success">
    <IconCheckCircle />
    <span><slot /></span>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
