<script setup lang="ts">
import TooltipBase from '@/components//parts/TooltipBase.vue'
import { useLang } from '@/composables/useLang'
import { iconMap, type Icon } from '@/utils'

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
    <component :is="iconMap[icon]" class="inline rounded-full bg-slate-800 text-white" />
    <span class="ml-1 hidden text-xs font-bold tracking-tight md:inline-block">
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
