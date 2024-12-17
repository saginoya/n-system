<script setup lang="ts">
import { useValueList } from '@/composables/useValueList'
import NInputCheckbox from '@/components/atoms/NInputCheckbox.vue'

import type { NInputCheckboxProps } from '@/components/atoms/NInputCheckbox.vue'

defineProps<{
  options: NInputCheckboxProps[]
}>()

const model = defineModel<string[]>()

// 配列とそれを操作する関数
const { valueList, addValue, removeValue } = useValueList()

// チェックボックスの切り替えで値を操作
const toggleValue = (value: string, event: InputEvent): void => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    addValue(value)
  } else {
    removeValue(value)
  }
  // 配列の情報をモデルに上書きする
  model.value = valueList.value
}
</script>

<template>
  <NInputCheckbox
    v-for="option in options"
    :key="option.value"
    :name="option.name"
    :value="option.value"
    @change="toggleValue(option.value, $event)"
  >
    {{ option.value }}
  </NInputCheckbox>
</template>
