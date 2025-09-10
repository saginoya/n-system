<script setup lang="ts">
import { cn } from '@/lib/cn'

export type TooltipProps = {
  location?: 'top' | 'bottom' | 'right' | 'left'
  color?: 'light' | 'dark'
  className?: string
}

withDefaults(defineProps<TooltipProps>(), { location: 'top', color: 'light' })

const locationStyleMap = {
  top: ['sm:-top-1', 'sm:left-1/2', 'sm:right-auto', 'sm:-translate-y-full', 'sm:-translate-x-1/2'],
  bottom: [
    'sm:-bottom-1',
    'sm:top-auto',
    'sm:left-1/2',
    'sm:right-auto',
    'sm:translate-y-full',
    'sm:-translate-x-1/2',
  ],
  right: ['sm:-right-1', 'sm:left-auto', 'sm:translate-x-full'],
  left: ['sm:-left-1', 'sm:right-auto', 'sm:-translate-x-full'],
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
          'rounded invisible fixed inset-x-0 top-1/2 z-50 m-2 -translate-y-1/2  p-2 text-sm opacity-0 transition-all delay-150 ease-in-out group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 sm:absolute sm:m-0 sm:inline-block sm:whitespace-nowrap shadow-lg',
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
