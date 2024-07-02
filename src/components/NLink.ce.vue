<script setup lang="ts">
import { useLink } from '@/utils/useLink'
import { useURL } from '@/utils/useURL'
import type { LinkType } from '@/types/link'

defineProps<{
  href: string
  type: LinkType
}>()

const { linkTarget, linkIcon } = useLink()
const { isSamePage } = useURL()
</script>

<template>
  <a
    class="inline-block rounded-full px-3 py-1 hover:bg-black/20 focus:bg-black/20"
    :class="{ 'bg-black/30': isSamePage(href), 'mix-blend-overlay': isSamePage(href) }"
    :href
    :target="linkTarget(type)"
  >
    <span class="flex items-center gap-1">
      <slot />
      <component v-if="type !== 'internal'" :is="linkIcon(type)" />
    </span>
  </a>
</template>

<style scoped>
@import url(@/assets/css/main.css);
</style>
