<script setup lang="ts">
import { watch } from 'vue'
import { useTextFormatter } from '@/utils/formatter/useTextFormatter'
import { useInputStyle } from '@/utils/styleHelpers/useInputStyle'
import type { FormFieldText } from '@/types/formField'

defineProps<FormFieldText>()

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useTextFormatter()
const { inputStyleDefault } = useInputStyle()

watch(model, () => {
  model.value = convertFullWidthSymbolToHalfWidth(convertFullWidthToHalfWidth(model.value))
})
</script>

<template>
  <input
    type="text"
    :name
    :required
    :disabled
    :form
    :readonly
    :autocomplete
    inputmode="text"
    :placeholder
    :pattern
    :maxlength
    v-model="model"
    :class="inputStyleDefault"
  />
</template>
