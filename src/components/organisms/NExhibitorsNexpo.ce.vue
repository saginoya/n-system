<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useExhibitorList } from '@/composables/useExhibitorList'
import { useExhibitorListSort } from '@/composables/useExhibitorListSort'
import { useExhibitorListFilter } from '@/composables/useExhibitorListFilter'
import { useExhibitorListHeading } from '@/composables/useExhibitorListHeading'
import { useExhibitorListFavorite } from '@/composables/useExhibitorListFavorite'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'

import NExhibitorListHeading from '@/components/atoms/NExhibitorListHeading.vue'
import NExhibitorListItem from '@/components/molecules/NExhibitorListItem.vue'
import NExhibitorProfile from '@/components/organisms/NExhibitorProfile.vue'
import NInputSearch from '@/components/molecules/NInputSearch.vue'
import NListDisc from '@/components/atoms/NListDisc.ce.vue'
import NModalBase from '@/components/molecules/NModalBase.vue'
import NSwitch from '@/components/atoms/NSwitch.vue'
import NSwitcBookmark from '@/components/molecules/NSwitcBookmark.vue'
import NTabs from '@/components/molecules/NTabs.vue'
import NTitleLv3 from '@/components/atoms/NTitleLv3.ce.vue'
import NTooltipInfo from '@/components/molecules/NTooltipInfo.ce.vue'
import NBtn from '@/components/atoms/NBtn.vue'

import type { Exhibitor, Exhibitions } from '@/types'

const props = defineProps<{
  listSrc: string
  genreSrc: string
  favoriteKey: string
}>()
const { lang } = useLang()

// 展示会の種類
const exhibitions: Exhibitions = {
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
// 出展社リストの読み込み
const { exhibitorList, numberOfExhibitors, genres } = useExhibitorList(
  lang.value,
  props.listSrc,
  props.genreSrc,
  exhibitions,
)

// リストのソート機能
const { stateSort } = useExhibitorListSort(exhibitorList)

// お気に入り機能
const { myFavorites, switchFavorite } = useExhibitorListFavorite(props.favoriteKey)

// リストのフィルター機能
const {
  stateKeyword,
  stateFavorite,
  numberOfVisibleExhibitors,
  setStateExhibition,
  validateExhibitor,
} = useExhibitorListFilter(exhibitorList, myFavorites)

// リストの見出し機能
const { headings } = useExhibitorListHeading(
  exhibitorList,
  stateSort,
  lang.value,
  validateExhibitor,
)

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

// 条件をもとにメソッドを実行
watchEffect(() => {
  setStateExhibition(exhibitions.nexpo[lang.value], nexpo.value)
  setStateExhibition(exhibitions.gwpe[lang.value], gwpe.value)
})

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
        <NTabs
          v-model="stateSort"
          name="sort"
          :values="['name', 'koma']"
          :labels="sortLabel[lang]"
        ></NTabs>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center">
        <!-- キーワードフィルターのインプット -->
        <NInputSearch v-model="stateKeyword" :datalist="genresList"></NInputSearch>
        <!-- キーワードフィルターのインフォメーション -->
        <NTooltipInfo location="left">
          <div v-if="lang === 'ja'">
            <p><b>キーワード＆エリア検索機能：</b></p>
            <NListDisc>
              <li>各出展社をキーワードで絞込することができます。</li>
              <li>検索タブをクリックすると、出展エリアでの絞込をする ことができます。</li>
              <li>
                複数キーワードでの検索はできません。またエリア
                検索とキーワード検索は同時に行えません。
              </li>
            </NListDisc>
          </div>
          <div v-else>
            <p><b>Keyword & Area Search</b></p>
            <p>Exhibitors can be searched by keyword or Area.</p>
            <div class="mt-4 italic">
              <p>*Remarks:</p>
              <p>Cannot search by multiple Keywords or Areas.</p>
              <p>Cannot search by Area & Keywords at the same time.</p>
            </div>
          </div>
        </NTooltipInfo>
      </div>
    </div>

    <!-- ツールバーの2段目 -->
    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <!-- 展示会フィルターのスイッチ -->
      <div class="flex gap-2">
        <NSwitch
          id="nexpo"
          v-model="nexpo"
          :label="exhibitions.nexpo[lang]"
          :color="exhibitions.nexpo.color"
        ></NSwitch>
        <NSwitch
          id="gwpe"
          v-model="gwpe"
          :label="exhibitions.gwpe[lang]"
          :color="exhibitions.gwpe.color"
        ></NSwitch>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center">
        <!-- お気に入りフィルターのタブ -->
        <NSwitcBookmark name="bookmark" v-model="stateFavorite" color="success"></NSwitcBookmark>

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
      {{ lang === 'ja' ? '表示中の件数' : 'Search Result' }}: {{ numberOfVisibleExhibitors }} /
      {{ numberOfExhibitors }}
    </p>
  </div>

  <!-- フィルター後の件数が0件の場合の注意書き -->
  <div v-if="numberOfVisibleExhibitors === 0" class="py-4">
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
    <template v-for="(exhibitor, index) in exhibitorList" :key="exhibitor.id">
      <NExhibitorListHeading v-if="headings[index]">
        {{ headings[index] }}
      </NExhibitorListHeading>
      <NExhibitorListItem
        v-show="validateExhibitor(exhibitor)"
        :items="exhibitor"
        :favorite="myFavorites.includes(exhibitor.id)"
        :favorite-method="switchFavorite"
        @click="showModal(exhibitor)"
      ></NExhibitorListItem>
    </template>
  </ul>

  <!-- モーダルウインドウ（出展社の詳細情報） -->
  <NModalBase :visible :close-action="dismiss">
    <NExhibitorProfile
      v-if="currentExhibitor"
      :lang="lang"
      :exhibitor="currentExhibitor"
    ></NExhibitorProfile>
    <p v-else>情報がありません。</p>
    <template #footer>
      <NBtn color="gray" variant="text" @click="dismiss()">Close</NBtn>
    </template>
  </NModalBase>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
