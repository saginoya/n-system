<script setup lang="ts">
import NCard from '@/components/n-elements/NCard.ce.vue'
import BtnClose from '@/components/parts/BtnClose.vue'
import OverlayBase from '@/components/parts/OverlayBase.vue'
import TransitionScale from '@/components/parts/TransitionScale.vue'

defineProps<{
  visible: boolean
  closeAction: () => void
}>()
</script>

<template>
  <OverlayBase v-show="visible" class="z-50" @click="closeAction">
    <TransitionScale>
      <NCard
        v-show="visible"
        @click.stop
        class="relative max-h-full min-w-[60%] max-w-full"
        role="dialog"
      >
        <BtnClose class="absolute -right-4 -top-4" @click="closeAction"></BtnClose>
        <header>
          <slot name="header" />
        </header>
        <div class="overflow-y-auto overscroll-contain">
          <slot />
        </div>
        <footer class="text-center">
          <slot name="footer" />
        </footer>
      </NCard>
    </TransitionScale>
  </OverlayBase>
</template>
