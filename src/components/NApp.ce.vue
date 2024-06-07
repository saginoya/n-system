<script setup lang="ts">
import NLayoutDefault from './NLayoutDefault.ce.vue'
defineProps<{
  jsonPath: string
  page?: 'top'
}>()
</script>

<template>
  <Transition name="fade">
    <n-layout-default :json-path="jsonPath" :page="page">
      <slot />
    </n-layout-default>
  </Transition>
</template>
