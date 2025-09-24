<script setup lang="ts">
import { textColorMap, borderColorMap } from '@/styles'
import type { Color } from '@/types'

const props = withDefaults(
  defineProps<{
    name: string
    values: TabsValue[]
    labels?: string[]
    color?: Color
  }>(),
  {
    color: 'primary',
  },
)

const selectedClass = [
  textColorMap[props.color],
  'font-bold',
  borderColorMap[props.color],
  'bg-slate-50',
]

type TabsValue = string | boolean
const model = defineModel<TabsValue>()
const setModel = (value: TabsValue): void => {
  model.value = value
}
const isSelected = (value: TabsValue) => {
  return model.value === value
}
</script>

<template>
  <div role="tablist" class="inline-flex overflow-hidden rounded-t">
    <button
      v-for="(value, index) in values"
      :key="String(value)"
      role="tab"
      :id="String(value)"
      aria-controls="value"
      :ariaSelected="isSelected(value)"
      class="block border-b-4 px-4 py-1 text-center transition-all duration-150 hover:bg-slate-200"
      :class="isSelected(value) ? selectedClass : 'text-gray-400'"
      @click="setModel(value)"
    >
      {{ labels ? labels[index] : value }}
    </button>
  </div>
</template>
