<script setup lang="ts">
import { useLink } from '@/utils/useLink'
import type { LinkType } from '@/types/link'

defineProps<{
  href: string
  type: LinkType
}>()

const { linkTarget, linkIcon } = useLink()
</script>

<template>
  <a :href :target="linkTarget(type)">
    <slot />
    <component v-if="type !== 'internal'" :is="linkIcon(type)" class="ml-1 inline" />
  </a>
</template>
