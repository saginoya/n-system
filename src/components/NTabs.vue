<script setup lang="ts">
import { useColorStyle } from '@/utils/useColorStyle'
import type { Color } from '@/types/color'

const props = withDefaults(
  defineProps<{
    name: string
    values: string[]
    labels?: string[]
    color?: Color
  }>(),
  {
    color: 'primary'
  }
)

const { textColor, borderColor } = useColorStyle()

const classObject = (value: string) => {
  if (model.value !== value) return
  return [textColor(props.color), 'font-bold', borderColor(props.color), 'bg-slate-50']
}

const model = defineModel<string>()
const setModel = (value: string): void => {
  model.value = value
}
</script>

<template>
  <div role="tablist" class="flex overflow-hidden rounded-t">
    <button
      v-for="(value, index) in values"
      :key="value"
      role="tab"
      :id="value"
      aria-controls="value"
      :ariaSelected="model === value"
      :tabindex="model === value ? 0 : -1"
      class="block flex-1 border-b-4 px-4 py-2 text-center transition-all duration-150 hover:bg-slate-200"
      :class="classObject(value)"
      @click="setModel(value)"
    >
      {{ labels ? labels[index] : value }}
    </button>
  </div>
</template>
