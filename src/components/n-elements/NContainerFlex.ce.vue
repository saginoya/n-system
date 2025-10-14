<script setup lang="ts">
import { cn } from '@/lib/cn'
import {
  justifyMap,
  justifyMdMap,
  type Justify,
  gapMap,
  type Gap,
  alignItemsMap,
  type AlignItems,
  wrapMap,
  type Wrap,
} from '@/styles'

const props = withDefaults(
  defineProps<{
    as?: string
    alignItems?: AlignItems
    gap?: Gap
    wrap?: Wrap
    justify?: Justify
    justifyMd?: Justify
    spDirectionCol?: boolean
  }>(),
  {
    as: 'div',
    alignItems: 'center',
    gap: '2',
    wrap: 'wrap',
  },
)

const direction = props.spDirectionCol ? 'flex-col sm:flex-row' : undefined
</script>

<template>
  <component
    :is="as"
    :class="
      cn(
        'flex',
        alignItemsMap[alignItems],
        gapMap[gap],
        wrapMap[wrap],
        direction,
        [justify ? justifyMap[justify] : undefined],
        [justifyMd ? justifyMdMap[justifyMd] : undefined],
      )
    "
  >
    <slot />
  </component>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
