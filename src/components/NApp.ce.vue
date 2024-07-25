<script setup lang="ts">
import { computed } from 'vue'
import NLayoutDefault from '@/components/NLayoutDefault.vue'
import NLayoutIndex from '@/components/NLayoutIndex.vue'
const props = defineProps<{
  jsonPath: string
  layout?: 'default' | 'toppage'
}>()

const layoutComp = computed(() => {
  switch (props.layout) {
    case 'toppage':
      return NLayoutIndex
    default:
      return NLayoutDefault
  }
})
</script>

<template>
  <component :is="layoutComp" :json-path="jsonPath">
    <slot />
  </component>
</template>

<style>
@import url(../assets/css/main.css);
</style>
