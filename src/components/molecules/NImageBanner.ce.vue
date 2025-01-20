<script setup lang="ts">
import { useLink } from '@/utils/useLink'
import type { LinkType } from '@/types/link'

defineProps<{
  src: string
  alt: string
  href?: string
  type?: LinkType
}>()

const { linkTarget, linkIcon } = useLink()
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href ? href : null"
    :target="href ? (type ? linkTarget(type) : '_self') : null"
    class="relative h-auto w-full"
    :class="href ? 'hover:opacity-60' : undefined"
  >
    <img :src :alt />
    <div v-if="type" class="absolute left-0 top-0 flex size-full items-center justify-end">
      <span class="rounded-l-full bg-info py-2 pl-1.5 text-white">
        <component :is="linkIcon(type)" class="size-6" />
      </span>
    </div>
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
