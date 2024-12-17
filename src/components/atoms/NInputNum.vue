<script setup lang="ts">
import { watch } from 'vue'
import { useTextFormatter } from '@/utils/formatter/useTextFormatter'
import { useInputStyle } from '@/utils/styleHelpers/useInputStyle'
import type { FormFieldNumber } from '@/types/formField'

defineProps<FormFieldNumber>()

const model = defineModel<string>()

// 入力値をString型として処理する関数
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  model.value = target.value
}

const { convertFullWidthToHalfWidth } = useTextFormatter()
const { inputStyleDefault } = useInputStyle()

watch(model, () => {
  model.value = convertFullWidthToHalfWidth(model.value)
})
</script>

<template>
  <input
    type="number"
    :name
    :max
    :min
    :placeholder
    :readonly
    :step
    inputmode="numeric"
    :value="model"
    :class="inputStyleDefault"
    @input="handleInput"
  />
</template>
