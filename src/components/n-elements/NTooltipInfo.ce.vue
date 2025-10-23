<script setup lang="ts">
import TooltipBase from '@/components//parts/TooltipBase.vue'
import { iconMap, type Icon } from '@/utils'
import { useLang } from '@/composables/useLang'

withDefaults(
  defineProps<{
    location?: 'top' | 'bottom' | 'right' | 'left'
    icon?: Icon
  }>(),
  {
    location: 'top',
    icon: 'info',
  },
)

const { lang } = useLang()
const label = lang.value === 'en' ? 'Information' : 'インフォメーション'
</script>

<template>
  <TooltipBase
    :location
    color="dark"
    class-name="cursor-pointer rounded p-1 align-middle hover:bg-slate-100 focus:bg-slate-100"
  >
    <component :is="iconMap[icon]" class="inline bg-slate-800 rounded-full text-white" />
    <span class="hidden text-xs font-bold tracking-tight md:inline-block ml-1">
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
