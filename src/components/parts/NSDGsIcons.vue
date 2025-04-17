<script setup lang="ts">
import { ref } from 'vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import { useLang } from '@/composables/useLang'
import { SDGsJaMap, SDGsJaImgMap, SDGsEnMap, SDGsEnImgMap } from '@/utils'

import type { SDGsNumType } from '@/utils'

defineProps<{
  numbers: SDGsNumType[]
}>()

const { lang } = useLang()
const isJapanese = ref(lang.value === 'ja')
</script>

<template>
  <NContainerFlex>
    <component
      v-for="n in numbers"
      :key="n"
      :is="isJapanese ? SDGsJaImgMap[n] : SDGsEnImgMap[n]"
      :width="80"
      :height="80"
      :src="isJapanese ? SDGsJaImgMap[n] : SDGsEnImgMap[n]"
      :alt="isJapanese ? SDGsJaMap[n] : SDGsEnMap[n]"
      :title="isJapanese ? SDGsJaMap[n] : SDGsEnMap[n]"
      class="size-20"
    ></component>
  </NContainerFlex>
</template>
