<script setup lang="ts">
import { watchEffect } from 'vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'
import type { FormField } from '@/types/formField'

const props = withDefaults(defineProps<FormField>(), {
  autocomplete: 'email',
  placeholder: 'sample@sample.com',
  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
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
      type="email"
      :id="id || name"
      :name
      :required
      :disabled
      :form
      :readonly
      :autocomplete
      inputmode="email"
      :placeholder
      :pattern
      class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <div class="min-h-4">
      <NMsgCheck v-if="isValidate"></NMsgCheck>
      <NMsgWarning v-else>{{ errors[0] }}</NMsgWarning>
    </div>
    <slot />
  </div>
</template>
