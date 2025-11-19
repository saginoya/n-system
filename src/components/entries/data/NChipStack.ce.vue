<script setup lang="ts">
import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
const props = withDefaults(
  defineProps<{
    items: string
    separator?: string
  }>(),
  {
    separator: ',',
  },
)

const arr = props.items.split(props.separator)
</script>

<template>
  <NContainerFlex as="ul">
    <li v-for="(item, index) in arr" :key="index" class="rounded bg-gray-200/50 px-2 py-0.5">
      {{ item }}
    </li>
  </NContainerFlex>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
