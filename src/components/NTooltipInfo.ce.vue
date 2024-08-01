<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'
import { useLang } from '@/composables/useLang'

const props = defineProps<{
  location?: 'top' | 'bottom' | 'right' | 'left'
}>()

const { lang } = useLang()
const text = lang.value === 'en' ? 'Information' : 'インフォメーション'

const locationStyles = (): string[] => {
  switch (props.location) {
    case 'bottom':
      return ['sm:top-10', 'sm:-translate-y-0']
    case 'right':
      return ['sm:left-32', 'sm:-translate-y-1/2']
    case 'left':
      return ['sm:right-32', 'sm:left-auto', 'sm:-translate-y-1/2']
    default:
      return ['sm:bottom-10', 'sm:top-auto', 'sm:-translate-y-0']
  }
}
</script>

<template>
  <div
    class="group relative inline-block cursor-pointer rounded p-1 align-middle hover:bg-slate-100 focus:bg-slate-100"
  >
    <IconInfo class="inline text-2xl" />
    <span class="text-xs">{{ text }}</span>
    <div
      class="invisible fixed left-0 top-1/2 z-50 m-2 -translate-y-1/2 rounded bg-slate-800 p-2 text-sm text-white opacity-0 transition-all delay-150 ease-in-out group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 sm:absolute sm:m-0 sm:w-96"
      :class="locationStyles()"
    >
      <slot />
    </div>
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
