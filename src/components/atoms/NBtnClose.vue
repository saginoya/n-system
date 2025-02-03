<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'

withDefaults(
  defineProps<{
    size?: Size
  }>(),
  {
    size: 'md',
  },
)

const sizeOptions = {
  sm: 'size-6 text-base p-0.5',
  md: 'size-8 text-2xl p-1',
  lg: 'size-12 text-4xl p-2',
}

type Size = keyof typeof sizeOptions
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center rounded-full bg-slate-800 text-white"
    :class="sizeOptions[size]"
  >
    <IconClose />
  </button>
</template>
