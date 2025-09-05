<script setup lang="ts">
import { ref, computed } from 'vue'

import NListDisc from '@/components/n-elements/NListDisc.ce.vue'
import NTitleLv3 from '@/components/n-elements/NTitle.ce.vue'
import NTooltipInfo from '@/components/n-elements/NTooltipInfo.ce.vue'
import Btn from '@/components/parts/BtnBase.vue'
import ExhibitorListItem from '@/components/parts/ExhibitorListItem.vue'
import ExhibitorProfile from '@/components/parts/ExhibitorProfile.vue'
import InputSearch from '@/components/parts/InputSearch.vue'
import ModalBase from '@/components/parts/ModalBase.vue'
import SwitcBookmark from '@/components/parts/SwitcBookmark.vue'
import SwitchBase from '@/components/parts/SwitchBase.vue'
import TabsBase from '@/components/parts/TabsBase.vue'
import { useExhibitorList } from '@/composables/useExhibitorList'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'
import type { Exhibitor, Color } from '@/types'

const props = defineProps<{
  listSrc: string
  genreSrc: string
  favoriteKey: string
}>()
const { lang } = useLang()

// 展示会の種類
const exhibitions = {
  nexpo: {
    ja: 'NEW環境展',
    en: 'N-EXPO',
    color: 'exhibition-a',
  },
  gwpe: {
    ja: '地球温暖化防止展',
    en: 'GWPE',
    color: 'exhibition-b',
  },
}

// 出展社リスト
const {
  exhibitorList,
  numExhibitorList,
  numRawExhibitorList,
  genres,
  myFavorites,
  stateSort,
  stateFavorite,
  stateKeyword,
  updateStateSort,
  switchFavorite,
} = useExhibitorList(props.listSrc, props.genreSrc, props.favoriteKey, lang.value)

// ジャンルの読み込み
const genresList = computed(() => {
  if (!genres.value) return undefined
  return genres.value?.map((item) => item[lang.value === 'ja' ? 'name' : 'nameEng'])
})

// ソート
const sortLabel = {
  ja: ['50音順', '小間番号順'],
  en: ['Name', 'Booth number'],
}

// 展示会フィルター条件
const nexpo = ref<boolean>(true)
const gwpe = ref<boolean>(true)

// モーダルウインドウ
const { visible, show, dismiss } = useModal()
const currentExhibitor = ref<Exhibitor | undefined>()
const showModal = (exhibitor: Exhibitor) => {
  currentExhibitor.value = exhibitor
  show()
}
</script>

<template>
  <!-- ツールバー -->
  <div class="flex flex-col gap-2">
    <!-- ツールバーの1段目 -->
    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <!-- ソートの条件タブ -->
      <div class="text-center">
        <TabsBase
          v-model="stateSort"
          name="sort"
          :values="['order', 'koma']"
          :labels="sortLabel[lang]"
        ></TabsBase>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center">
        <!-- キーワードフィルターのインプット -->
        <InputSearch
          v-model="stateKeyword"
          :datalist="genresList"
          @update:model-value="updateStateSort('search')"
        ></InputSearch>
      </div>
    </div>

    <!-- ツールバーの2段目 -->
    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <!-- 展示会フィルターのスイッチ -->
      <div class="flex gap-2">
        <SwitchBase
          id="nexpo"
          v-model="nexpo"
          :label="exhibitions.nexpo[lang]"
          :color="exhibitions.nexpo.color as Color"
        ></SwitchBase>
        <SwitchBase
          id="gwpe"
          v-model="gwpe"
          :label="exhibitions.gwpe[lang]"
          :color="exhibitions.gwpe.color as Color"
        ></SwitchBase>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center">
        <!-- お気に入りフィルターのタブ -->
        <SwitcBookmark name="bookmark" v-model="stateFavorite" color="success"></SwitcBookmark>

        <!-- お気に入りフィルターのインフォメーション -->
        <NTooltipInfo location="left">
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
      </div>
    </div>

    <!-- フィルター後のリストの件数表示 -->
    <p>
      {{ lang === 'ja' ? '表示中の件数' : 'Search Result' }}: {{ numExhibitorList }} /
      {{ numRawExhibitorList }}
    </p>
  </div>

  <!-- フィルター後の件数が0件の場合の注意書き -->
  <div v-if="numExhibitorList === 0" class="py-4">
    <div v-if="lang === 'ja'">
      <NTitleLv3>該当する出展社はありませんでした</NTitleLv3>
      <p>検索条件をご確認ください。</p>
      <NListDisc>
        <li>キーワード検索に意図しない文字が入力されていませんか？</li>
        <li>環境展・地球温暖化防止展のチェックボックスが外れていませんか？</li>
        <li>お気に入り登録は★アイコンで登録した出展社が表示されます。</li>
        <li>それぞれの検索条件は重複します。</li>
      </NListDisc>
    </div>
    <div v-else>
      <NTitleLv3>If shown as "Not Find"</NTitleLv3>
      <p>Please check these, mentioned below.</p>
      <NListDisc>
        <li>Are there any unintended characters entered in the keyword search?</li>
        <li>Is the N-Expo and GWPE checkbox unchecked?</li>
        <li>Favorite will be displayed for exhibitors registered with the ★ icon.</li>
        <li>Each search condition is duplicated.</li>
      </NListDisc>
    </div>
  </div>

  <!-- 出展社の一覧リスト -->
  <ul class="divide-y">
    <template v-for="exhibitor in exhibitorList" :key="exhibitor.id">
      <ExhibitorListItem
        :id="exhibitor.id"
        :koma="exhibitor.koma"
        :name="exhibitor.name"
        :contents="exhibitor.contents"
        :is-favorite="myFavorites.includes(exhibitor.id)"
        :favorite-method="switchFavorite"
        @click="showModal(exhibitor)"
      ></ExhibitorListItem>
    </template>
  </ul>

  <!-- モーダルウインドウ（出展社の詳細情報） -->
  <ModalBase :visible :close-action="dismiss">
    <ExhibitorProfile
      v-if="currentExhibitor"
      :lang="lang"
      :id="currentExhibitor.id"
      :name="currentExhibitor.name"
      :koma="currentExhibitor.koma"
      exhibition="環境展"
      :subName="currentExhibitor.subName"
      :genre="currentExhibitor.genre"
      :webSite="currentExhibitor.webSite"
      :contents="currentExhibitor.contents"
      :sdgs="currentExhibitor.sdgs"
      :isFavorite="myFavorites.includes(currentExhibitor.id)"
      :favorite-method="switchFavorite"
      :color="exhibitions.nexpo.color as Color"
    ></ExhibitorProfile>
    <p v-else>情報がありません。</p>
    <template #footer>
      <Btn color="gray" variant="text" @click="dismiss()">Close</Btn>
    </template>
  </ModalBase>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
