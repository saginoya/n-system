<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'
import IconWaring from '@/components/icons/IconWarning.vue'
import { textColorMap, borderColorMap } from '@/styles'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'warning'
  }>(),
  {
    type: 'info',
  },
)

const colorStyles = [textColorMap[props.type], borderColorMap[props.type]]
</script>

<template>
  <div class="flex flex-col items-center gap-2 rounded border p-2 md:flex-row" :class="colorStyles">
    <div class="p-0 text-4xl text-current opacity-50 md:p-2">
      <component :is="type === 'info' ? IconInfo : IconWaring" />
    </div>
    <div class="text-current">
      <slot />
    </div>
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
