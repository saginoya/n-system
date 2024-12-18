<script setup lang="ts" generic="T">
import { useGenericList } from '@/composables/useGenericList'
import NInputCheckbox from '@/components/atoms/NInputCheckbox.vue'

export type NInputMultiSelectProps<T> = {
  name: string
  value: T
  checked?: boolean
  disabled?: boolean
  label?: string
}

defineProps<{
  options: NInputMultiSelectProps<T>[]
}>()

const model = defineModel<T[]>()

// 配列とそれを操作する関数
const { genericList, addValue, removeValue } = useGenericList<T>()

// チェックボックスの切り替えで値を操作
const toggleValue = (value: T, event: InputEvent): void => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    addValue(value)
  } else {
    removeValue(value)
  }
  // 配列の情報をモデルに上書きする
  model.value = Array.from(genericList)
}
</script>

<template>
  <NInputCheckbox
    v-for="option in options"
    :key="option.name"
    :name="option.name"
    :value="option.value"
    @change="toggleValue(option.value, $event)"
  >
    {{ option.label || option.value }}
  </NInputCheckbox>
</template>
