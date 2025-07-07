<script setup lang="ts">
type Lv = 'h2' | 'h3' | 'h4' | 'h5'

withDefaults(
  defineProps<{
    lv?: Lv
    note?: string
    currentColor?: boolean
  }>(),
  {
    lv: 'h3',
    currentColor: false,
  },
)
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <component :is="lv" :class="{ 'text-current': currentColor }">
      <slot />
    </component>
    <span v-if="note" :class="{ 'text-current': currentColor }">
      {{ note }}
    </span>
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
