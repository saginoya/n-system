<script setup lang="ts">
import { watch } from 'vue'
import { useText } from '@/utils/useText'
import { useInputStyle } from '@/utils/useInputStyle'
import type { FormField } from '@/types/formField'

defineProps<FormField>()

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useText()
const { inputStyleDefault } = useInputStyle()

watch(model, () => {
  model.value = convertFullWidthSymbolToHalfWidth(convertFullWidthToHalfWidth(model.value))
})
</script>

<template>
  <input
    type="url"
    :name
    :required
    :disabled
    :form
    :readonly
    :autocomplete
    inputmode="url"
    :placeholder
    :pattern
    v-model="model"
    :class="inputStyleDefault"
  />
</template>
