<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NMsgCheck from './NMsgCheck.ce.vue'
import NMsgWarning from './NMsgWarning.ce.vue'
import { useValidation } from '@/composables/useValidation'
import { useFetchAddress } from '@/plugins/useFetchAddress'
import type { AttributesInput } from '@/types/attributesInputs'

type AttributesAccess = {
  addressTitle?: string
  addressName?: string
}

const props = withDefaults(defineProps<AttributesInput & AttributesAccess>(), {
  name: 'postal-code',
  autocomplete: 'postal-code',
  inputmode: 'decimal',
  placeholder: '101-0061',
  pattern: '^[0-9]{3}-?[0-9]{4}$',
  addressTitle: '住所',
  addressName: 'address'
})

const model = ref<string>('')

const { isValidation, validationMsg, validateCheck } = useValidation()
const { address, fetchAddress, clearAddress } = useFetchAddress()

watchEffect(() => {
  validateCheck(model.value, props.required, props.pattern)
  if (isValidation) {
    fetchAddress(model.value)
  } else {
    clearAddress()
  }
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="title" :for="name" class="font-bold">{{ title }}</label>
    <input
      type="text"
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
      <n-msg-check v-if="isValidation"></n-msg-check>
      <n-msg-warning v-else>{{ validationMsg }}</n-msg-warning>
    </div>
    <label for="address" class="font-bold">{{ addressTitle }}</label>
    <input
      id="address"
      type="text"
      :name="addressName"
      v-model="address"
      class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
    />
    <slot />
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
