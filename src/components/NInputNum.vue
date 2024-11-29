<script setup lang="ts">
import type { FormFieldNumber } from '@/types/formField'

defineProps<FormFieldNumber>()

const model = defineModel<string>()

// 入力値をString型として処理する関数
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  model.value = target.value
}
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
    @input="handleInput"
    class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
