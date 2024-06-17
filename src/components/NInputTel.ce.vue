<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NMsgCheck from './NMsgCheck.ce.vue'
import NMsgWarning from './NMsgWarning.ce.vue'
import { useValidation } from '@/composables/useValidation'
import type { AttributesInput } from '@/types/attributesInputs'

const props = withDefaults(defineProps<AttributesInput>(), {
  name: 'tel',
  autocomplete: 'tel',
  inputmode: 'tel',
  placeholder: '03-3262-3462',
  pattern:
    '^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,4}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$'
})

const model = ref<string>('')

const { errors, isValidate, setTermsRequired, setTermsPattern, validate } = useValidation()
setTermsRequired(props.required)
setTermsPattern(props.pattern)
watchEffect(() => {
  validate(model.value)
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <input
      type="tel"
      :id="name"
      :name
      :required
      :disabled
      :form
      :readonly
      :autocomplete
      :inputmode
      :placeholder
      :pattern
      class="w-full max-w-xs rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <div class="min-h-4">
      <n-msg-check v-if="isValidate"></n-msg-check>
      <n-msg-warning v-else>{{ errors[0] }}</n-msg-warning>
    </div>
    <slot />
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
