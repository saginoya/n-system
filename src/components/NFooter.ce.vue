<script setup lang="ts">
import type { Link } from '@/types/link'

defineProps<{
  nav?: Link[]
}>()
</script>

<template>
  <footer class="bg-primary px-4 py-2 text-white">
    <div v-if="nav" class="hidden lg:block">
      <n-list-nav-row :links="nav"> </n-list-nav-row>
      <hr />
    </div>
    <slot />
  </footer>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
