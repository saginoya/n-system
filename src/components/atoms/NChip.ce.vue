<script setup lang="ts">
import NLinkText from '@/components/atoms/NLinkText.vue'
import { useColorStyle } from '@/styles'
import type { Color } from '@/types/color'
import type { LinkType } from '@/types/link'

defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()

const { bgColor } = useColorStyle()
</script>

<template>
  <component
    :is="href ? NLinkText : 'span'"
    :href="href ? href : null"
    :type="href ? type || 'internal' : null"
    class="inline-block overflow-hidden rounded-full px-3 py-1 align-middle text-white"
    :class="bgColor(color)"
  >
    <slot />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
