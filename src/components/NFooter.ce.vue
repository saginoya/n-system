<script setup lang="ts">
import NListNavRow from './NListNavRow.ce.vue'
import type { Link } from '@/types/link'

defineProps<{
  nav?: Link[]
}>()
</script>

<template>
  <footer class="bg-primary px-4 text-white">
    <div v-if="nav" class="hidden py-2 lg:block">
      <n-list-nav-row :links="nav"> </n-list-nav-row>
    </div>
    <hr />
    <div class="py-2">
      <slot />
    </div>
  </footer>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
