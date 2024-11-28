<script setup lang="ts">
import type { FormFieldTextarea } from '@/types/formField'

withDefaults(defineProps<FormFieldTextarea>(), {
  cols: 40,
  rows: 4
})

const model = defineModel<string>()
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
    class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
  ></textarea>
</template>
