<script setup lang="ts">
import { bgColorMap } from '@/styles'
import type { Color, LinkType } from '@/types'
import { getLinkTarget, linkIconMap } from '@/utils'

defineProps<
  | {
      color: Color
      href: string
      type: LinkType
    }
  | {
      color: Color
      href?: undefined
      type?: undefined
    }
>()
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href ? href : null"
    :target="type ? getLinkTarget(type) : null"
    class="inline-flex items-center justify-center gap-0.5 overflow-hidden rounded-full px-3 py-1 align-middle text-white"
    :class="bgColorMap[color]"
  >
    <span>
      <slot />
    </span>
    <component v-if="type" :is="linkIconMap[type]" class="inline" />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
