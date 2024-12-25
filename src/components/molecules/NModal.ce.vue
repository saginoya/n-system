<script setup lang="ts">
import NBtn from '@/components/atoms/NBtn.ce.vue'
import NModalBase from '@/components/molecules/NModalBase.vue'
import { useModal } from '@/composables/useModal'
import type { Color } from '@/types/color'

withDefaults(
  defineProps<{
    btnTitle: string
    btnColor?: Color
  }>(),
  {
    btnColor: 'primary',
  },
)

const { visible, show, dismiss } = useModal()
</script>

<template>
  <NBtn :color="btnColor" :action="show">{{ btnTitle }}</NBtn>
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
