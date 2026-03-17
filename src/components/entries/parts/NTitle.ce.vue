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
@import '@/assets/css/web-component.css';

@layer base {
  h2 {
    @apply text-3xl font-bold tracking-tight text-slate-500 font-mono;
  }
  h3 {
    @apply text-2xl font-bold text-slate-700 font-mono;
  }
  h4 {
    @apply text-xl font-bold tracking-wider text-slate-800;
  }
  h5 {
    @apply text-lg font-bold tracking-wider text-slate-900;
  }
}
</style>
