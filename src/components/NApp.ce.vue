<script setup lang="ts">
defineProps<{
  jsonPath: string
  topPage?: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <n-layout-default :json-path="jsonPath" :top-page="topPage">
      <slot />
    </n-layout-default>
  </Transition>
</template>
