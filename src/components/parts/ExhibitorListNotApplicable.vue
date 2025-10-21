<script setup lang="ts">
import NList from '@/components/n-elements/NList.ce.vue'
import NTitle from '@/components/n-elements/NTitle.ce.vue'
import type { Lang } from '@/types'

defineProps<{
  lang: Lang
}>()
</script>

<template>
  <div class="py-4">
    <div v-if="lang === 'ja'">
      <NTitle>該当する出展社はありませんでした</NTitle>
      <p>検索条件をご確認ください。</p>
      <NList>
        <li>キーワード検索に意図しない文字が入力されていませんか？</li>
        <li>意図しない絞り込み条件が設定されていませんか？</li>
        <li>お気に入り登録は★アイコンで登録した出展社が表示されます。</li>
        <li>それぞれの検索条件は重複します。</li>
      </NList>
    </div>
    <div v-else>
      <NTitle>If shown as "Not Find"</NTitle>
      <p>Please check these, mentioned below.</p>
      <NList>
        <li>Are there any unintended characters entered in the keyword search?</li>
        <li>Have you accidentally set any unintended filtering conditions?</li>
        <li>Favorite will be displayed for exhibitors registered with the ★ icon.</li>
        <li>Each search condition is duplicated.</li>
      </NList>
    </div>
  </div>
</template>
