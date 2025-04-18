<script setup lang="ts">
import type { LinkType } from '@/types'
import { getLinkTarget, linkIconMap } from '@/utils'

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
