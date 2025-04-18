<script setup lang="ts">
import NLink from '@/components/n-elements/NLink.ce.vue'
import type { Link } from '@/types'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="mx-auto flex max-w-5xl flex-wrap justify-around justify-items-center">
    <li v-for="(link, index) in links" :key="index" class="text-center">
      <NLink :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </NLink>
    </li>
  </ul>
</template>
