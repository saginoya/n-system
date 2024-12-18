<script setup lang="ts">
import type { CharacterCountProps } from '@/components/atoms/NCharacterCount.vue'

import NValidationStatus from '@/components/atoms/NValidationStatus.vue'
import NCharacterCount from '@/components/atoms/NCharacterCount.vue'

defineProps<
  {
    isValid: boolean
    errors: string[]
    placeholder?: string
  } & CharacterCountProps
>()
</script>

<template>
  <div class="flex justify-between px-2 text-sm">
    <NValidationStatus :is-valid="isValid" :msg="errors[0]" :placeholder> </NValidationStatus>
    <NCharacterCount v-if="maxlength || minlength" :value :maxlength :minlength></NCharacterCount>
  </div>
</template>
