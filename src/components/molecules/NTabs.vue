<script setup lang="ts">
import { useColorStyle } from '@/utils/styleHelpers/useColorStyle'
import type { Color } from '@/types/color'

const props = withDefaults(
  defineProps<{
    name: string
    values: string[]
    labels?: string[]
    color?: Color
  }>(),
  {
    color: 'primary',
  },
)

const { textColor, borderColor } = useColorStyle()

const selectedClass = [textColor(props.color), 'font-bold', borderColor(props.color), 'bg-slate-50']

const model = defineModel<string>()
const setModel = (value: string): void => {
  model.value = value
}
const isSelected = (value: string) => {
  return model.value === value
}
</script>

<template>
  <div role="tablist" class="inline-flex overflow-hidden rounded-t">
    <button
      v-for="(value, index) in values"
      :key="value"
      role="tab"
      :id="value"
      aria-controls="value"
      :ariaSelected="isSelected(value)"
      :tabindex="isSelected(value) ? 0 : -1"
      class="block border-b-4 px-4 py-1 text-center transition-all duration-150 hover:bg-slate-200"
      :class="isSelected(value) ? selectedClass : 'text-gray-400'"
      @click="setModel(value)"
    >
      {{ labels ? labels[index] : value }}
    </button>
  </div>
</template>
