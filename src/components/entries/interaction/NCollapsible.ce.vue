<script setup lang="ts">
import { ref } from 'vue'

import IconArrowDown from '@/components/icons/IconArrowDown.vue'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
  }>(),
  {
    defaultOpen: false,
  },
)

const open = ref<boolean>(props.defaultOpen)
const toggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div
    class="relative overflow-hidden transition-[max-height] duration-300 ease-in-out pb-6"
    :class="open ? 'max-h-250' : 'max-h-12'"
  >
    <slot />
    <button
      type="button"
      class="absolute bottom-0 inset-x-0 p-0.5 flex justify-center items-center h-6 border-b-2 border-white text-slate-400 hover:border-info hover:text-info"
      :class="{ 'bg-linear-to-t from-white to-white/0': !open }"
      @click="toggle()"
    >
      <span class="rounded-full bg-white">
        <IconArrowDown class="duration-300" :class="{ 'rotate-180': open }" />
      </span>
    </button>
  </div>
</template>

<style>
@import '@/assets/css/web-component.css';
</style>
