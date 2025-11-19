<script setup lang="ts">
defineProps<{
  mark?: string
  last?: boolean
}>()
</script>

<template>
  <li
    class="group flex min-h-16 items-stretch gap-2 py-2 transition-all hover:bg-teal-50"
    role="listitem"
  >
    <div class="flex flex-col items-center gap-1">
      <div
        class="size-8 -translate-y-1 overflow-hidden rounded-full bg-teal-600 text-center leading-8 text-white group-hover:bg-teal-500"
      >
        {{ mark }}
      </div>
      <div v-if="!last" class="grow border-l border-l-slate-300"></div>
    </div>
    <div class="flex flex-col gap-1">
      <slot />
    </div>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
