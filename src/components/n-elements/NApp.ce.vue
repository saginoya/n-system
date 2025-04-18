<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import LayoutDefault from '@/components/layouts/LayoutDefault.vue'
import LayoutIndex from '@/components/layouts/LayoutIndex.vue'
import ModalPageLoading from '@/components/parts/ModalPageLoading.vue'
import TransitionFade from '@/components/parts/TransitionFade.vue'
import { setBodyVisibility } from '@/utils'

const props = defineProps<{
  jsonPath: string
  layout?: 'default' | 'toppage'
}>()

// レイアウトのコンポーネントの選択
const layoutComp = computed(() => {
  switch (props.layout) {
    case 'toppage':
      return LayoutIndex
    default:
      return LayoutDefault
  }
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
