<script setup lang="ts">
import { cn } from '@/lib/cn'

export type TooltipProps = {
  location?: 'top' | 'bottom' | 'right' | 'left'
  color?: 'light' | 'dark'
  className?: string
}

withDefaults(defineProps<TooltipProps>(), { location: 'top', color: 'light' })

const locationStyleMap = {
  top: '-top-1 left-1/2 -translate-y-full -translate-x-1/2',
  bottom: '-bottom-1 left-1/2 translate-y-full -translate-x-1/2',
  right: '-right-1 top-1/2 translate-x-full -translate-y-1/2',
  left: '-left-1 top-1/2 -translate-x-full -translate-y-1/2',
}

const colorStyleMap = {
  light: ['bg-white border border-gray-200'],
  dark: ['bg-slate-800 text-white'],
}
</script>

<template>
  <div class="group relative inline-block cursor-pointer">
    <slot />
    <div
      :class="
        cn(
          'rounded invisible z-50 p-2 text-sm opacity-0 transition-all delay-150 ease-in-out group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 absolute inline-block whitespace-nowrap shadow-lg',
          locationStyleMap[location],
          colorStyleMap[color],
          className,
        )
      "
    >
      <slot name="text" />
    </div>
  </div>
</template>
