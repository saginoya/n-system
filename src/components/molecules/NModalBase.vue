<script setup lang="ts">
import NCard from '@/components/atoms/NCard.ce.vue'
import NBtnClose from '@/components/atoms/NBtnClose.vue'
import NOverlay from '@/components/atoms/NOverlay.vue'
import NTransitionScale from '@/components/atoms/NTransitionScale.vue'

defineProps<{
  visible: boolean
  closeAction: () => void
}>()
</script>

<template>
  <NOverlay v-show="visible" class="z-50" @click="closeAction">
    <NTransitionScale>
      <NCard
        v-show="visible"
        @click.stop
        class="relative max-h-full min-w-[60%] max-w-full"
        role="dialog"
      >
        <NBtnClose class="absolute -right-4 -top-4" @click="closeAction"></NBtnClose>
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
    </NTransitionScale>
  </NOverlay>
</template>
