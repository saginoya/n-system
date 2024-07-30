<script setup lang="ts">
import NBtn from '@/components/NBtn.ce.vue'
import NCard from '@/components/NCard.ce.vue'
import NTransitionFade from '@/components/NTransitionFade.vue'
import NTransitionScale from './NTransitionScale.vue'
import { useModal } from '@/composables/useModal'

defineProps<{
  btnTitle: string
  noBtn?: boolean
}>()

const { visible, show, dismiss } = useModal()
</script>

<template>
  <NBtn v-if="!noBtn" color="primary" @click="show()">{{ btnTitle }}</NBtn>
  <NTransitionFade>
    <div
      v-show="visible"
      class="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center overflow-y-scroll overscroll-contain bg-black/70"
      @click="dismiss()"
    >
      <NTransitionScale>
        <NCard v-show="visible" @click.stop>
          <slot />
          <NBtn color="gray" variant="text" @click="dismiss()">Close</NBtn>
        </NCard>
      </NTransitionScale>
    </div>
  </NTransitionFade>
</template>

<style>
@import url(../assets/css/main.css);
</style>
