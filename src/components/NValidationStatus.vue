<script setup lang="ts">
import NMsgCheck from '@/components/NMsgCheck.vue'
import NMsgWarning from '@/components/NMsgWarning.vue'

defineProps<{
  isValid: boolean
  msg?: string
  placeholder?: string
}>()
</script>

<template>
  <component :is="isValid ? NMsgCheck : NMsgWarning">
    <span v-show="msg">{{ msg }}</span>
    <span v-show="placeholder">（記入例: {{ placeholder }}）</span>
  </component>
</template>
