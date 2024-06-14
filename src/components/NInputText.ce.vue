<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NMsgCheck from './NMsgCheck.ce.vue'
import NMsgWarning from './NMsgWarning.ce.vue'
import { useValidation } from '@/composables/useValidation'
import type { AttributesInput } from '@/types/attributesInputs'

const props = withDefaults(defineProps<AttributesInput>(), {
  inputmode: 'text'
})

const model = ref<string>('')

const { isValidation, validationMsg, validateCheck } = useValidation()
watchEffect(() => {
  validateCheck(model.value, props.required, props.pattern)
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
      class="w-full max-w-2xl rounded border-2 border-gray-300 px-2 py-1 text-lg"
      v-model="model"
    />
    <div class="min-h-6">
      <n-msg-check v-if="isValidation"></n-msg-check>
      <n-msg-warning v-else>{{ validationMsg }}</n-msg-warning>
    </div>
    <slot />
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
