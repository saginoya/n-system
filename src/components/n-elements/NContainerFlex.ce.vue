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
} from '@/styles'

const props = withDefaults(
  defineProps<{
    justify?: Justify
    justifyMd?: Justify
    alignItems?: AlignItems
    gap?: Gap
    spDirectionCol?: boolean
  }>(),
  {
    alignItems: 'center',
    gap: '2',
  },
)

const justifyStyles = (): (string | null)[] => {
  return [
    props.justify ? justifyMap[props.justify] : null,
    props.justifyMd ? justifyMdMap[props.justifyMd] : null,
  ]
}

const direction = props.spDirectionCol ? 'flex-col sm:flex-row' : undefined
</script>

<template>
  <div
    :class="
      cn('flex flex-wrap', justifyStyles(), alignItemsMap[alignItems], gapMap[gap], direction)
    "
  >
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
