<script setup lang="ts">
import LinkBlock from '@/components/parts/LinkBlock.vue'
import type { Link } from '@/types'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <LinkBlock :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </LinkBlock>
    </li>
  </ul>
</template>
