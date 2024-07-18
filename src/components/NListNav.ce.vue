<script setup lang="ts">
import NLink from './NLink.ce.vue'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <n-link :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </n-link>
    </li>
  </ul>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
