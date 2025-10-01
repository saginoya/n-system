<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import LayoutDefault from '@/components/layouts/LayoutDefault.vue'
import LayoutFullScreen from '@/components/layouts/LayoutFullScreen.vue'
import ModalPageLoading from '@/components/parts/ModalPageLoading.vue'
import TransitionFade from '@/components/parts/TransitionFade.vue'
import { setBodyVisibility } from '@/utils'

const props = withDefaults(
  defineProps<{
    jsonPath: string
    layout?: Layout
  }>(),
  {
    layout: 'default',
  },
)

const layoutMap = {
  default: LayoutDefault,
  'full-screen': LayoutFullScreen,
} as const

type Layout = keyof typeof layoutMap

// レイアウトのコンポーネントの選択
const layoutComp = computed(() => {
  return layoutMap[props.layout]
})

// HTMLのbodyを表示する
// HTMLやCSSでbodyが隠されている前提
setBodyVisibility()

// ページ全体をフェードさせるための仕組み
const isLoading = ref<boolean>(true)
onMounted(() => {
  isLoading.value = false
})
</script>

<template>
  <TransitionFade>
    <div v-if="isLoading">
      <ModalPageLoading />
    </div>
    <div v-else>
      <component :is="layoutComp" :json-path="jsonPath">
        <slot />
      </component>
    </div>
  </TransitionFade>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
