<script setup lang="ts">
import { cn } from '@/lib/cn'

withDefaults(
  defineProps<{
    mark?: string
    type?: 'default' | 'light'
  }>(),
  {
    mark: '※',
    type: 'default',
  },
)

const typeClasses = {
  default: 'gap-1 border-l-2 border-l-info bg-gray-50 p-2',
  light: 'gap-0.5 text-xs italic text-gray-600 md:justify-end',
}
</script>

<template>
  <div :class="cn('flex', typeClasses[type])">
    <div>{{ mark }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
