<script setup lang="ts">
import { computed } from 'vue'
import { useModal } from '@/composables/useModal'
import NBtnClose from '@/components/atoms/NBtnClose.vue'

defineProps<{
  position: Position
}>()

const positionOptions = {
  top: 'inset-x-0 top-0 bg-black/20 md:flex-row py-1',
  bottom: 'inset-x-0 bottom-0 bg-black/20 md:flex-row py-1',
  left: 'left-[calc(50%-680px)] inset-y-0',
  right: 'right-[calc(50%-680px)] inset-y-0',
}

type Position = keyof typeof positionOptions

const displayOptions = {
  hidden: 'hidden',
  flex: 'flex flex-col items-center justify-center gap-1',
}

const { visible, dismiss } = useModal(true)

const displayClass = computed<string>(() => {
  return visible.value ? displayOptions['flex'] : displayOptions['hidden']
})
</script>

<template>
  <div class="fixed" :class="`${displayClass} ${positionOptions[position]}`">
    <slot />
    <NBtnClose size="sm" @click="dismiss()"></NBtnClose>
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
