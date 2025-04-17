<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { setBodyVisibility } from '@/utils'

import LayoutDefault from '@/components/layouts/LayoutDefault.vue'
import LayoutIndex from '@/components/layouts/LayoutIndex.vue'
import NTransitionFade from '@/components/atoms/NTransitionFade.vue'
import NModalPageLoading from '@/components/atoms/NModalPageLoading.vue'

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
  <NTransitionFade>
    <div v-if="isLoading">
      <NModalPageLoading />
    </div>
    <div v-else>
      <component :is="layoutComp" :json-path="jsonPath">
        <slot />
      </component>
    </div>
  </NTransitionFade>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
