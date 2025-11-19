<script setup lang="ts">
import { ref, computed } from 'vue'

import { textColorMap } from '@/styles'
import type { Color } from '@/types'
import { iconMap } from '@/utils'

const props = withDefaults(
  defineProps<{
    active: boolean
    color?: Color
  }>(),
  {
    color: 'primary',
    lang: 'ja',
  },
)

const avtiveClass = [textColorMap[props.color]]
const defaultClass = ['text-gray-300']

const classState = computed(() => {
  return props.active ? avtiveClass : defaultClass
})

// アニメーション
const isAnimating = ref<boolean>(false)
const handleClick = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 300) // アニメーションの継続時間に合わせる
}
</script>

<template>
  <button
    type="button"
    class="flex size-8 items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200"
    :class="classState"
    @click="handleClick"
  >
    <component
      :is="iconMap['bookmark']"
      class="inline size-6"
      :class="{ 'animate-ping': isAnimating }"
    />
  </button>
</template>
