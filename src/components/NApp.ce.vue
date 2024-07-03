<script setup lang="ts">
import { computed } from 'vue'
import NLayoutDefault from '@/components/NLayoutDefault.ce.vue'
import NLayoutIndex from '@/components/NLayoutIndex.ce.vue'
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
  <Transition name="fade">
    <component :is="layoutComp" :json-path="jsonPath">
      <slot />
    </component>
  </Transition>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
