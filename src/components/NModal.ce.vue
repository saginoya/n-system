<script setup lang="ts">
import NBtn from '@/components/NBtn.ce.vue'
import NCard from '@/components/NCard.ce.vue'
import NOverlay from '@/components/NOverlay.vue'
import NTransitionScale from '@/components/NTransitionScale.vue'
import NBtnClose from '@/components/NBtnClose.vue'
import { useModal } from '@/composables/useModal'
import type { Color } from '@/types/color'

withDefaults(
  defineProps<{
    btnTitle?: string
    btnColor?: Color
  }>(),
  {
    btnColor: 'primary'
  }
)

const { visible, show, dismiss } = useModal()

defineExpose({ show })
</script>

<template>
  <NBtn v-if="btnTitle" :color="btnColor" @click="show()">{{ btnTitle }}</NBtn>
  <NOverlay v-show="visible" class="z-50" @click="dismiss()">
    <NTransitionScale>
      <NCard ref="card" v-if="visible" @click.stop class="relative max-h-full" role="dialog">
        <NBtnClose class="absolute -right-4 -top-4" @click="dismiss()"></NBtnClose>
        <div class="overflow-y-auto overscroll-contain">
          <slot />
          <p class="text-center">
            <NBtn color="gray" variant="text" @click="dismiss()">Close</NBtn>
          </p>
        </div>
      </NCard>
    </NTransitionScale>
  </NOverlay>
</template>

<style>
@import url(../assets/css/main.css);
</style>
