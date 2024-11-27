<script setup lang="ts">
import { watchEffect } from 'vue'
import NMsgCheck from './NMsgCheck.vue'
import NMsgWarning from './NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'
import type { FormField } from '@/types/formField'

const props = withDefaults(defineProps<FormField>(), {
  name: 'tel',
  autocomplete: 'tel',
  placeholder: '03-3262-3462',
  pattern: '\\d{2,4}-?\\d{2,4}-?\\d{4}'
})

const emits = defineEmits<{ validated: [result: boolean] }>()

const model = defineModel<string>()

const { errors, isValidate, setTermsRequired, setTermsPattern, validate } = useValidation()
setTermsRequired(props.required)
setTermsPattern(props.pattern)
watchEffect(() => {
  validate(model.value)
  emits('validated', isValidate.value)
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <input
      type="tel"
      :id="id || name"
      :name
      :required
      :disabled
      :form
      :readonly
      :autocomplete
      inputmode="tel"
      :placeholder
      :pattern
      class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <div class="min-h-4">
      <NMsgCheck v-if="isValidate"></NMsgCheck>
      <NMsgWarning v-else>{{ errors[0] }}</NMsgWarning>
    </div>
    <slot />
  </div>
</template>
