<script setup lang="ts">
import { watchEffect } from 'vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'

import type { FormFieldNumber } from '@/types/formField'

const props = defineProps<FormFieldNumber>()

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
      type="number"
      :id="id || name"
      :name
      :max
      :min
      :placeholder
      :readonly
      :step
      inputmode="numeric"
      class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <slot />
    <div class="min-h-4">
      <NMsgCheck v-if="isValidate"></NMsgCheck>
      <NMsgWarning v-else>{{ errors[0] }}</NMsgWarning>
    </div>
  </div>
</template>
