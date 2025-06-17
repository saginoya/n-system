<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import type { Link } from '@/types'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="mx-auto flex max-w-5xl flex-wrap justify-around justify-items-center">
    <li v-for="(link, index) in links" :key="index" class="text-center">
      <ListNavItem :link> </ListNavItem>
    </li>
  </ul>
</template>
