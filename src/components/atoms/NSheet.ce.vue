<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'gray'
    height?: 'full' | 'auto'
  }>(),
  {
    height: 'full'
  }
)

const heightStyle = () => {
  switch (props.height) {
    case 'auto':
      return 'h-auto'
    default:
      return 'h-full'
  }
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 p-4"
    :class="[{ 'bg-gray-50': color === 'gray' }, heightStyle()]"
  >
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
