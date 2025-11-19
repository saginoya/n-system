<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: ListStyleType
    items?: string
  }>(),
  {
    type: 'disc',
  },
)

const listStyleTypeMap = {
  decimal: 'list-decimal',
  disc: 'list-disc',
  none: 'list-none',
} as const

type ListStyleType = keyof typeof listStyleTypeMap

const is = props.type === 'decimal' ? 'ol' : 'ul'

const itemList: string[] = props.items ? props.items.split(',') : []
</script>

<template>
  <component :is :class="listStyleTypeMap[type]" class="pl-6 [&>li]:py-0.5">
    <li v-for="(item, index) in itemList" :key="index">
      {{ item }}
    </li>
    <slot />
  </component>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
