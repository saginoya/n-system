<script setup lang="ts">
import { computed } from 'vue'

import { bgColorMap } from '@/styles'
import type { Color, RouterLinkProps } from '@/types'
import { linkManager } from '@/composables/useLinkManager'

const props = defineProps<
  {
    color: Color
    size: SizeOptions
  } & RouterLinkProps
>()

const { linkOptions } = linkManager({
  href: props.href,
  type: props.type,
  routerId: props.routerId,
})

const sizeOptions = {
  xs: 'size-16',
  sm: 'size-24',
  md: 'size-32',
  lg: 'size-40',
  xl: 'size-48',
}

type SizeOptions = keyof typeof sizeOptions

const variant = computed<string[]>(() => {
  const array = []
  array.push(bgColorMap[props.color])
  array.push(sizeOptions[props.size])

  return array
})
</script>

<template>
  <component
    :is="linkOptions ? 'a' : 'span'"
    :href="linkOptions ? linkOptions.href : undefined"
    :target="linkOptions ? linkOptions.target : undefined"
    class="inline-flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus:opacity-80"
    :class="variant"
  >
    <slot />
    <component
      v-if="linkOptions"
      :is="linkOptions.icon"
      class="absolute inset-y-auto right-2 size-6"
    />
  </component>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
