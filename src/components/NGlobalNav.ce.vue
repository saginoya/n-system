<script setup lang="ts">
import type { Link } from '@/types/link'

defineProps<{
  nav: Link[]
}>()
</script>

<template>
  <div class="hidden bg-primary px-4 py-2 text-white lg:block">
    <nav>
      <n-list-nav-row :links="nav" />
    </nav>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
