<script setup lang="ts">
import { computed } from 'vue'
import type { Image } from '@/types/image'

const props = defineProps<
  Image & {
    overlay?: boolean
  }
>()

// 最大公約数を求める関数
const getGCD = (x: number, y: number): number => (x % y ? getGCD(y, x % y) : y)
// アスペクト比のスタイル
const aspectStyle = computed(() => {
  if (typeof props.width !== 'number' || typeof props.height !== 'number') {
    return undefined
  }
  const gcd: number = getGCD(props.width, props.height)
  const widthValue = props.width / gcd
  const heightValue = props.height / gcd
  return { 'aspect-ratio': widthValue / heightValue }
})
</script>

<template>
  <figure class="w-fit" :class="{ relative: overlay }">
    <img
      :width="width"
      :height="height"
      loading="lazy"
      decoding="auto"
      :src="src"
      :alt="alt"
      class="h-auto max-w-full bg-gray-50 align-top"
      :class="[cover ? 'object-cover' : 'object-contain']"
      :style="aspectStyle"
    />
    <figcaption v-if="caption" class="text-sm leading-5" :style="{ 'max-width': width + 'px' }">
      {{ caption }}
    </figcaption>
    <div
      v-if="overlay"
      class="absolute left-0 top-0 flex size-full flex-col items-center justify-center"
    >
      <span class="bg-white/90 px-1 text-center">
        <slot />
      </span>
    </div>
  </figure>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
