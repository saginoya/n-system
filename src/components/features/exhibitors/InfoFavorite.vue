<script setup lang="ts">
import NTooltipInfo from '@/components/entries/interaction/NTooltipInfo.ce.vue'
import type { Lang } from '@/types'

defineProps<{
  lang: Lang
}>()
</script>

<template>
  <NTooltipInfo icon="question" location="bottom">
    <div v-if="lang === 'ja'">
      <p><b>お気に入り登録を表示機能：</b></p>
      <p>各出展社の★アイコンをクリックするとお気に入り登録することができます。</p>
      <p>※お気に入り登録はブラウザに保存されるため、別の端末やブラウザには同期されません。</p>
      <p>※また、キャッシュが削除されると消えてしまいます。</p>
    </div>
    <div v-else>
      <p><b>Favorite★</b></p>
      <p>Click on the ★ icon for each exhibitor to bookmark it.</p>
      <div class="mt-4 italic">
        <p>*Remarks:</p>
        <p>Bookmarks is (are) stored in your browser</p>
        <p>It is not synced to another device or browser.</p>
        <p>It is disappeared when the cache is cleared.</p>
      </div>
    </div>
  </NTooltipInfo>
</template>
