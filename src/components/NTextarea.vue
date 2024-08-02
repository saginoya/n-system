<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'
import { useValidation } from '@/composables/useValidation'

const props = withDefaults(
  defineProps<{
    name: string
    title?: string
    autofocus?: boolean
    cols?: number
    disabled?: boolean
    form?: string
    maxlength?: number
    minlength?: number
    placeholder?: string
    readonly?: boolean
    required?: boolean
    rows?: number
  }>(),
  {
    cols: 40,
    rows: 4
  }
)

const model = ref<string>('')

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
      type="email"
      :id="name"
      :name
      :autofocus
      :cols
      :disabled
      :form
      :maxlength
      :minlength
      :placeholder
      :readonly
      :required
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

<style>
@import url(../assets/css/main.css);
</style>
