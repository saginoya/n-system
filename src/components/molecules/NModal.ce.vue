<script setup lang="ts">
import NBtn from '@/components/atoms/NBtn.vue'
import NModalBase from '@/components/molecules/NModalBase.vue'
import { useModal } from '@/composables/useModal'

defineProps<{
  btnTitle?: string
}>()

const { visible, show, dismiss } = useModal()
</script>

<template>
  <button type="button" @click="show">
    <slot name="btn">
      {{ btnTitle }}
    </slot>
  </button>
  <NModalBase :visible :close-action="dismiss">
    <slot />
    <template #footer>
      <NBtn color="gray" variant="text" :action="dismiss">Close</NBtn>
    </template>
  </NModalBase>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
