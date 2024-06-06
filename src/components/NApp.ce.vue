<script setup lang="ts">
defineProps<{
  jsonPath: string
  page?: string
}>()
</script>

<template>
  <Transition name="fade">
    <n-layout-default :json-path="jsonPath" :page="page">
      <slot />
    </n-layout-default>
  </Transition>
</template>
