<script setup lang="ts">
import NLinkText from '@/components/atoms/NLinkText.vue'
import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'

defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()
</script>

<template>
  <component
    :is="href ? NLinkText : 'span'"
    :href="href ? href : null"
    :type="href ? type || 'internal' : null"
    class="inline-block overflow-hidden rounded-full px-3 py-1 align-middle text-white"
    :class="bgColorMap[color]"
  >
    <slot />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
