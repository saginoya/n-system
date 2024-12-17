<script setup lang="ts">
import NValidationStatus from '@/components/molecules/NValidationStatus.vue'
import NCharacterCount from '@/components/atoms/NCharacterCount.vue'

defineProps<{
  isValid: boolean
  errors: string[]
  value?: string
  maxlength?: number
  minlength?: number
  placeholder?: string
}>()
</script>

<template>
  <div class="flex justify-between px-2 text-sm">
    <NValidationStatus :is-valid="isValid" :msg="errors[0]" :placeholder> </NValidationStatus>
    <NCharacterCount v-if="maxlength || minlength" :value :maxlength :minlength></NCharacterCount>
  </div>
</template>
