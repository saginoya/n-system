<script setup lang="ts">
import { watchEffect } from 'vue'
import { useValidation } from '@/composables/useValidation'

import NInputWrapper from '@/components/NInputWrapper.ce.vue'
import NInputEmail from '@/components/NInputEmail.vue'
import NInputNum from '@/components/NInputNum.vue'
import NInputPostalCode from '@/components/NInputPostalCode.vue'
import NInputTel from '@/components/NInputTel.vue'
import NInputText from '@/components/NInputText.vue'
import NInputTextarea from '@/components/NInputTextarea.vue'
import NInputUrl from '@/components/NInputUrl.vue'
import NInputsRadio from '@/components/NInputsRadio.vue'
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'

import type {
  FormField,
  FormFieldText,
  FormFieldNumber,
  FormFieldTextarea
} from '@/types/formField'

const props = defineProps<{
  formField: FormField | FormFieldText | FormFieldNumber | FormFieldTextarea
}>()
const { type, required, pattern, title, name } = props.formField

const maxlength = (props.formField as FormFieldText | FormFieldTextarea).maxlength ?? undefined

const minlength = (props.formField as FormFieldTextarea).minlength ?? undefined

const emits = defineEmits<{ validated: [result: boolean] }>()

const model = defineModel<string>()

const { errors, isValid, validate } = useValidation({ required, pattern, maxlength, minlength })
watchEffect(() => {
  validate(model.value)
  emits('validated', isValid.value)
})

const getInputComponent = () => {
  switch (type) {
    case 'email':
      return NInputEmail
    case 'number':
      return NInputNum
    case 'postal-code':
      return NInputPostalCode
    case 'tel':
      return NInputTel
    case 'text':
      return NInputText
    case 'textarea':
      return NInputTextarea
    case 'url':
      return NInputUrl
    case 'radio':
      return NInputsRadio
    default:
      return NInputText
  }
}
</script>

<template>
  <NInputWrapper :title="title || name" :required="required">
    <div class="flex flex-col gap-1">
      <component :is="getInputComponent()" v-model="model" v-bind="formField" />
      <div class="flex justify-between px-2 text-sm">
        <div class="min-h-4">
          <NMsgCheck v-if="isValid"></NMsgCheck>
          <NMsgWarning v-else>{{ errors[0] }}</NMsgWarning>
        </div>
        <div v-if="maxlength || minlength">
          <span>{{ formField.value?.length || 0 }}</span>
          <span v-show="maxlength"> / {{ maxlength }}</span>
          <span v-show="minlength"> ({{ minlength }}文字以上)</span>
        </div>
      </div>
      <slot />
    </div>
  </NInputWrapper>
</template>
