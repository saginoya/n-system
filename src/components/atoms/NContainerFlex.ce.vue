<script setup lang="ts">
import { justifyOptions, justifyMdOptions } from '@/styles'
import type { Justify } from '@/styles'

const props = defineProps<{
  justify?: Justify
  justifyMd?: Justify
}>()

const justifyStyles = (): (string | null)[] => {
  return [
    props.justify ? justifyOptions[props.justify] : null,
    props.justifyMd ? justifyMdOptions[props.justifyMd] : null,
  ]
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2" :class="justifyStyles()">
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
