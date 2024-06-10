<script setup lang="ts">
import NLink from './NLink.ce.vue'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="mx-auto flex max-w-5xl flex-wrap justify-around gap-2">
    <li v-for="(link, index) in links" :key="index">
      <n-link :href="link.path" :type="link.type" class="text-white">
        {{ link.name }}
      </n-link>
    </li>
  </ul>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
