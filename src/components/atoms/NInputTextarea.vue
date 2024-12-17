<script setup lang="ts">
import { watch } from 'vue'
import { useTextFormatter } from '@/utils/formatter/useTextFormatter'
import { useInputStyle } from '@/utils/styleHelpers/useInputStyle'
import type { FormFieldTextarea } from '@/types/formField'

withDefaults(defineProps<FormFieldTextarea>(), {
  cols: 40,
  rows: 4
})

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useTextFormatter()
const { inputStyleDefault } = useInputStyle()

watch(model, () => {
  model.value = convertFullWidthSymbolToHalfWidth(convertFullWidthToHalfWidth(model.value))
})
</script>

<template>
  <textarea
    :name
    :disabled
    :form
    :maxlength
    :minlength
    :placeholder
    :readonly
    :required
    :cols
    :rows
    v-model="model"
    :class="inputStyleDefault"
  ></textarea>
</template>
