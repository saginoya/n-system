<script setup lang="ts">
import { watch } from 'vue'
import { useText } from '@/utils/useText'
import { useInputStyle } from '@/utils/useInputStyle'
import type { FormFieldText } from '@/types/formField'

defineProps<FormFieldText>()

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useText()
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
