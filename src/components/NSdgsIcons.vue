<script setup lang="ts">
import { ref } from 'vue'
import NContainerFlex from '@/components/NContainerFlex.ce.vue'
import { useLang } from '@/composables/useLang'
import { useSdgs } from '@/utils/useSdgs'

defineProps<{
  numbers: number[]
}>()

const { lang } = useLang()
const isJapanese = ref(lang.value === 'ja')

const { sdgsJa, sdgsJaImg, sdgsEn, sdgsEnImg } = useSdgs()
</script>

<template>
  <NContainerFlex>
    <component
      v-for="n in numbers"
      :key="n"
      :is="isJapanese ? sdgsJaImg[n] : sdgsEnImg[n]"
      :width="80"
      :height="80"
      :src="isJapanese ? sdgsJaImg[n] : sdgsEnImg[n]"
      :alt="isJapanese ? sdgsJa[n] : sdgsEn[n]"
      :title="isJapanese ? sdgsJa[n] : sdgsEn[n]"
      class="size-20"
    ></component>
  </NContainerFlex>
</template>
