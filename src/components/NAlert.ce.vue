<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'
import IconWaring from '@/components/icons/IconWarning.vue'
import { useColorStyle } from '@/utils/useColorStyle'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'warning'
  }>(),
  {
    type: 'info'
  }
)

const { textColor, borderColor } = useColorStyle()

const colorStyles = [textColor(props.type), borderColor(props.type)]
</script>

<template>
  <div class="flex items-center gap-2 rounded border border-l-4 px-2 py-1" :class="colorStyles">
    <div class="text-2xl text-current">
      <component :is="type === 'info' ? IconInfo : IconWaring" />
    </div>
    <div class="text-current">
      <slot />
    </div>
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
