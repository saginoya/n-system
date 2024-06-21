<script setup lang="ts">
import NLayoutDefault from '@/components/NLayoutDefault.ce.vue'
import NLayoutToppage from '@/components/NLayoutToppage.ce.vue'
defineProps<{
  jsonPath: string
  layout?: 'default' | 'toppage'
}>()

const getLayoutCompName = (key: string | undefined) => {
  switch (key) {
    case 'toppage':
      return 'n-layout-toppage'
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
