<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import type { Link } from '@/types'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <ListNavItem :link> </ListNavItem>
    </li>
  </ul>
</template>
