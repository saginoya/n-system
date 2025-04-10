<script setup lang="ts">
import { ref } from 'vue'
import NContainerFlex from '@/components/atoms/NContainerFlex.ce.vue'
import { useLang } from '@/composables/useLang'
import { useSDGs } from '@/utils'

import type { SDGsNumType } from '@/utils'

defineProps<{
  numbers: SDGsNumType[]
}>()

const { lang } = useLang()
const isJapanese = ref(lang.value === 'ja')

const { SDGsJa, SDGsJaImg, SDGsEn, SDGsEnImg } = useSDGs()
</script>

<template>
  <NContainerFlex>
    <component
      v-for="n in numbers"
      :key="n"
      :is="isJapanese ? SDGsJaImg[n] : SDGsEnImg[n]"
      :width="80"
      :height="80"
      :src="isJapanese ? SDGsJaImg[n] : SDGsEnImg[n]"
      :alt="isJapanese ? SDGsJa[n] : SDGsEn[n]"
      :title="isJapanese ? SDGsJa[n] : SDGsEn[n]"
      class="size-20"
    ></component>
  </NContainerFlex>
</template>
