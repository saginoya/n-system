<script setup lang="ts">
import NBulletedList from '@/components/entries/data/NBulletedList.ce.vue'
import NContainer1col from '@/components/entries/layouts/NContainer1col.ce.vue'
import NTitle from '@/components/entries/parts/NTitle.ce.vue'
import type { Lang } from '@/types'

defineProps<{
  lang: Lang
}>()
</script>

<template>
  <NContainer1col class="py-4">
    <template v-if="lang === 'ja'">
      <NTitle>該当する出展社はありませんでした</NTitle>
      <p>検索の条件をご確認ください。</p>
      <NBulletedList>
        <li>キーワード検索に意図しない文字が入力されていませんか？</li>
        <li>意図しない絞り込み条件が設定されていませんか？</li>
        <li>お気に入りは★アイコンで登録した出展社が表示されます。</li>
        <li>それぞれの検索条件は重複します。</li>
      </NBulletedList>
    </template>
    <template v-else>
      <NTitle>If shown as "Not Find"</NTitle>
      <p>Please check these, mentioned below.</p>
      <NBulletedList>
        <li>Are there any unintended characters entered in the keyword search?</li>
        <li>Have you accidentally set any unintended filtering conditions?</li>
        <li>Favorite will be displayed for exhibitors registered with the ★ icon.</li>
        <li>Each search condition is duplicated.</li>
      </NBulletedList>
    </template>
  </NContainer1col>
</template>
