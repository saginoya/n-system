<script setup lang="ts">
import NContainer1col from '@/components/entries/layouts/NContainer1col.ce.vue'
import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
import NChip from '@/components/entries/parts/NChip.ce.vue'

defineProps<{
  title: string
  required?: boolean
}>()
</script>

<template>
  <NContainer1col gap="1">
    <NContainerFlex class="font-bold">
      <NChip :color="required ? 'warning' : 'gray-light'" size="sm">
        {{ required ? '必須' : '任意' }}
      </NChip>
      <span>{{ title }}</span>
    </NContainerFlex>
    <NContainer1col gap="0.5">
      <slot />
    </NContainer1col>
  </NContainer1col>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
