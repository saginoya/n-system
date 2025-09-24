<script setup lang="ts">
import Btn from '@/components/parts/BtnBase.vue'
import ModalBase from '@/components/parts/ModalBase.vue'
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
  <ModalBase :inert="!visible" :visible :close-action="dismiss">
    <slot />
    <template #footer>
      <Btn color="gray" variant="text" :onClick="dismiss">Close</Btn>
    </template>
  </ModalBase>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
