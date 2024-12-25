<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: 0 | 0.5 | 1 | 2 | 4 | 8 | 12
  }>(),
  {
    gap: 2,
  },
)

const gapStyle = (num: number): string => {
  switch (num) {
    case 0:
      return 'gap-0'
    case 0.5:
      return 'gap-0.5'
    case 1:
      return 'gap-1'
    case 2:
      return 'gap-2'
    case 4:
      return 'gap-4'
    case 8:
      return 'gap-8'
    case 12:
      return 'gap-12'
    default:
      return 'gap-2'
  }
}
</script>

<template>
  <div class="flex flex-col" :class="gapStyle(gap)">
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
