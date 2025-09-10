<script setup lang="ts">
import TooltipBase from '@/components//parts/TooltipBase.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import { useLang } from '@/composables/useLang'

defineProps<{
  location?: 'top' | 'bottom' | 'right' | 'left'
}>()

const { lang } = useLang()
const label = lang.value === 'en' ? 'Information' : 'インフォメーション'
</script>

<template>
  <TooltipBase
    :location
    color="dark"
    class-name="cursor-pointer rounded p-1 align-middle hover:bg-slate-100 focus:bg-slate-100"
  >
    <IconInfo class="inline text-xl" />
    <span class="hidden text-xs font-bold tracking-tight md:inline-block">
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
