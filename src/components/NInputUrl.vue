<script setup lang="ts">
import { watch } from 'vue'
import { useText } from '@/utils/useText'
import type { FormField } from '@/types/formField'

defineProps<FormField>()

const model = defineModel<string>()

const { convertFullWidthToHalfWidth, convertFullWidthSymbolToHalfWidth } = useText()

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
    class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
