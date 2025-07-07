<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { cn } from '@/lib/cn'
import { bgColorMap } from '@/styles'
import { chipBase } from '@/styles'
import type { Color, LinkType } from '@/types'
import { getLinkOptions } from '@/utils'

const props = defineProps<{
  color: Color
  href?: string
  type?: LinkType
}>()

const linkOptions = props.href && props.type ? getLinkOptions(props.href, props.type) : undefined
</script>

<template>
  <component
    :is="linkOptions ? LinkBox : 'span'"
    :href="linkOptions ? linkOptions.href : null"
    :target="linkOptions ? linkOptions.target : null"
    :icon="linkOptions ? linkOptions.icon : null"
    :class="
      cn(
        chipBase,
        'inline-flex overflow-hidden  align-middle text-white',
        bgColorMap[color],
        { 'hover:ring focus:ring': linkOptions },
        {
          'px-2': !linkOptions,
        },
      )
    "
  >
    <slot />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
