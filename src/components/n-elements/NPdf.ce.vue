<script setup lang="ts">
import BtnBase from '@/components/parts/BtnBase.vue'
import { useLang } from '@/composables/useLang'

const { lang } = useLang()

const props = defineProps<{
  src: string
}>()

const openTab = () => {
  window.open(props.src, '_blank')
}

// 最後の '/' の位置を取得
const lastSlashIndex = props.src.lastIndexOf('/')

// '/' の次の文字から最後までをファイル名として取得
const filename = props.src.substring(lastSlashIndex + 1)
</script>

<template>
  <object :data="src" type="application/pdf" class="size-full">
    <div class="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
      <p>{{ filename }}</p>
      <BtnBase color="info" rel="noopener noreferrer" append-icon="pdf" :on-click="openTab">
        {{ lang === 'ja' ? 'PDFを開く' : 'Open PDF' }}
      </BtnBase>
    </div>
  </object>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
