<script setup lang="ts">
import { ref } from 'vue'

import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
import TooltipBase from '@/components/ui/TooltipBase.vue'
import { useLang } from '@/composables/useLang'
import type { SDGsNum } from '@/types'
import { SDGsJaMap, SDGsJaImgMap, SDGsEnMap, SDGsEnImgMap } from '@/utils'

defineProps<{
  numbers: SDGsNum[]
}>()

const { lang } = useLang()
const isJapanese = ref(lang.value === 'ja')
</script>

<template>
  <NContainerFlex>
    <TooltipBase v-for="n in numbers" :key="n">
      <component
        :is="isJapanese ? SDGsJaImgMap[n] : SDGsEnImgMap[n]"
        :width="60"
        :height="60"
        :src="isJapanese ? SDGsJaImgMap[n] : SDGsEnImgMap[n]"
        :alt="isJapanese ? SDGsJaMap[n] : SDGsEnMap[n]"
        class="size-15"
      ></component>
      <template v-slot:text>
        {{ isJapanese ? SDGsJaMap[n] : SDGsEnMap[n] }}
      </template>
    </TooltipBase>
  </NContainerFlex>
</template>
