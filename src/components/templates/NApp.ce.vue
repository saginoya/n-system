<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHTML } from '@/utils/useHTML'

import NLayoutDefault from '@/components/templates/NLayoutDefault.vue'
import NLayoutIndex from '@/components/templates/NLayoutIndex.vue'
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
      return NLayoutIndex
    default:
      return NLayoutDefault
  }
})

// HTMLのbodyを表示する
// HTMLやCSSでbodyが隠されている前提
const { toBodyStyleVisible } = useHTML()
toBodyStyleVisible()

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
@import url(../../assets/css/main.css);
</style>
