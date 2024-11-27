<script setup lang="ts">
import { watchEffect } from 'vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'

import type { FormFieldTextarea } from '@/types/formField'

const props = withDefaults(defineProps<FormFieldTextarea>(), {
  cols: 40,
  rows: 4
})

const model = defineModel<string>()

const { errors, isValidate, setTermsRequired, validate } = useValidation()
setTermsRequired(props.required)

watchEffect(() => {
  validate(model.value)
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <textarea
      :id="id || name"
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
      class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    ></textarea>
    <div class="min-h-4">
      <n-msg-check v-if="isValidate"></n-msg-check>
      <n-msg-warning v-else>{{ errors[0] }}</n-msg-warning>
    </div>
    <slot />
  </div>
</template>
