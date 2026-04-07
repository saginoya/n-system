<script setup lang="ts">
import { ref } from 'vue'

import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import IconArrowUp from '@/components/icons/IconArrowUp.vue'

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
    @click="toggle()"
    class="relative overflow-hidden transition-[max-height] duration-300 ease-in-out cursor-pointer border-b-2 border-gray-100 hover:border-primary pb-1"
    :style="{ maxHeight: open ? '999px' : '3rem' }"
  >
    <slot />
    <span
      class="absolute bottom-0 right-0 bg-white/50 rounded-full p-0.5 flex justify-center items-center"
    >
      <component :is="open ? IconArrowUp : IconArrowDown" class="" />
    </span>
  </div>
</template>

<style>
@import '@/assets/css/web-component.css';
</style>
