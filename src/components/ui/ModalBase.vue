<script setup lang="ts">
import NCard from '@/components/entries/layouts/NCard.ce.vue'
import BtnClose from '@/components/features/BtnClose.vue'
import OverlayBase from '@/components/ui/OverlayBase.vue'
import TransitionScale from '@/components/ui/TransitionScale.vue'

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
