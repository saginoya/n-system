<script setup lang="ts">
import TooltipBase from '@/components/ui/TooltipBase.vue'
import { iconMap, type Icon } from '@/utils'

withDefaults(
  defineProps<{
    location?: 'top' | 'bottom' | 'right' | 'left'
    icon?: Icon
    label?: string
  }>(),
  {
    location: 'top',
    icon: 'info',
  },
)
</script>

<template>
  <TooltipBase :location color="dark">
    <component :is="iconMap[icon]" class="inline rounded-full bg-slate-800 text-white" />
    <span class="hidden p-0.5 text-xs font-bold tracking-tight md:inline-block">
      {{ label }}
    </span>
    <template v-slot:text>
      <slot></slot>
    </template>
  </TooltipBase>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
