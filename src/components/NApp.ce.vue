<script setup lang="ts">
import NLayoutDefault from '@/components/NLayoutDefault.ce.vue'
import NLayoutIndex from '@/components/NLayoutIndex.ce.vue'
defineProps<{
  jsonPath: string
  layout?: 'default' | 'toppage'
}>()

const getLayoutCompName = (key: string | undefined) => {
  switch (key) {
    case 'toppage':
      return 'n-layout-index'
    default:
      return 'n-layout-default'
  }
}
</script>

<template>
  <Transition name="fade">
    <component :is="getLayoutCompName(layout)" :json-path="jsonPath">
      <slot />
    </component>
  </Transition>
</template>
