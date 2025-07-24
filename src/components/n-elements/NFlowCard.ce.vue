<script setup lang="ts">
import NBreakpointSwitcher from '@/components/n-elements/NBreakpointSwitcher.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NIcon from '@/components/n-elements/NIcon.ce.vue'

defineProps<{
  header?: string
  last?: boolean
}>()
</script>

<template>
  <NContainerFlex align-items="stretch" class="h-auto sm:h-full">
    <!-- フローの本体 -->
    <section class="w-full rounded border shadow-md transition-all hover:shadow-lg sm:w-48">
      <header class="bg-slate-100 px-2 pt-1 text-center font-bold">
        <slot name="header">
          {{ header }}
        </slot>
      </header>
      <div class="p-2">
        <slot />
      </div>
    </section>
    <!-- フローの矢印 -->
    <NContainerFlex
      v-if="!last"
      align-items="center"
      justify="center"
      class="h-auto w-full sm:h-full sm:w-auto"
    >
      <NBreakpointSwitcher sm>
        <NIcon name="arrow-down" />
        <template v-slot:sm>
          <NIcon name="arrow-right" />
        </template>
      </NBreakpointSwitcher>
    </NContainerFlex>
  </NContainerFlex>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
