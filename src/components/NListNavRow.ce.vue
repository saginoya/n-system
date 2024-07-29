<script setup lang="ts">
import NLink from './NLink.ce.vue'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="mx-auto flex max-w-5xl flex-wrap justify-around justify-items-center">
    <li v-for="(link, index) in links" :key="index" class="text-center">
      <n-link :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </n-link>
    </li>
  </ul>
</template>

<style>
@import url(../assets/css/main.css);
</style>
