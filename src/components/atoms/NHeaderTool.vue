<script setup lang="ts">
import IconMenu from '@/components/icons/IconMenu.vue'
import IconClose from '@/components/icons/IconClose.vue'
defineProps<{
  active: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="fixed bottom-2 right-2 flex size-16 flex-col items-center justify-center rounded-full border-2 border-white/0 bg-primary text-white shadow drop-shadow hover:border-white/80 focus:border-white/80"
  >
    <component :is="active === true ? IconClose : IconMenu" class="size-8"></component>
    <span class="text-xs">MENU</span>
  </button>
</template>
