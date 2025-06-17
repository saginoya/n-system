<script setup lang="ts">
import NLink from '@/components/n-elements/NLink.ce.vue'
import type { Link } from '@/types'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <NLink :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </NLink>
    </li>
  </ul>
</template>
