<script setup lang="ts">
import NMsgCheck from '@/components/atoms/NMsgCheck.vue'
import NMsgWarning from '@/components/atoms/NMsgWarning.vue'

export type ValidationStatusProps = {
  isValid: boolean
  msg?: string
  placeholder?: string
}

defineProps<ValidationStatusProps>()
</script>

<template>
  <component :is="isValid ? NMsgCheck : NMsgWarning">
    <span v-show="msg">{{ msg }}</span>
    <span v-show="placeholder">（記入例: {{ placeholder }}）</span>
  </component>
</template>
