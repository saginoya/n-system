<script setup lang="ts">
import { getLinkTarget, linkIconMap } from '@/utils'
import type { LinkType } from '@/types'

defineProps<{
  href: string
  type: LinkType
}>()
</script>

<template>
  <a :href :target="getLinkTarget(type)">
    <slot />
    <component v-if="type !== 'internal'" :is="linkIconMap[type]" class="ml-1 inline" />
  </a>
</template>
