<script setup lang="ts">
import type { FormFieldText } from '@/types/formField'

defineProps<FormFieldText>()

const model = defineModel<string>()
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
    class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
  />
</template>
