<script setup lang="ts">
import { iconMap, type Icon } from '@/utils'

withDefaults(
  defineProps<{
    name: Icon
    size?: SizeOptions
  }>(),
  {
    size: 'md',
  },
)

const sizeOptions = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
}

type SizeOptions = keyof typeof sizeOptions
</script>

<template>
  <component
    :is="iconMap[name]"
    class="inline-block align-middle"
    :class="sizeOptions[size]"
  ></component>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
