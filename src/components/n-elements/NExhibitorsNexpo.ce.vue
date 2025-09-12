<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import NCard from '@/components/n-elements/NCard.ce.vue'
import NContainer1col from '@/components/n-elements/NContainer1col.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NContainerGrid from '@/components/n-elements/NContainerGrid.ce.vue'
import NTooltipInfo from '@/components/n-elements/NTooltipInfo.ce.vue'
import Btn from '@/components/parts/BtnBase.vue'
import BtnBase from '@/components/parts/BtnBase.vue'
import BtnMenu from '@/components/parts/BtnMenu.vue'
import ExhibitorListHeading from '@/components/parts/ExhibitorListHeading.vue'
import ExhibitorListItem from '@/components/parts/ExhibitorListItem.vue'
import ExhibitorListNotApplicable from '@/components/parts/ExhibitorListNotApplicable.vue'
import ExhibitorProfile from '@/components/parts/ExhibitorProfile.vue'
import InputSearch from '@/components/parts/InputSearch.vue'
import LoadingSpinner from '@/components/parts/LoadingSpinner.vue'
import ModalBase from '@/components/parts/ModalBase.vue'
import SwitchBase from '@/components/parts/SwitchBase.vue'
import TabsBase from '@/components/parts/TabsBase.vue'
import { useExhibitorList } from '@/composables/useExhibitorList'
import { useExhibitorListHeading } from '@/composables/useExhibitorListHeading'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'
import type { Exhibitor, Color, SortType } from '@/types'

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
  isLoading,
  stateSort,
  stateFavorite,
  stateGenres,
  stateKeyword,
  updateStateSort,
  switchFavorite,
  includedFavorites,
} = useExhibitorList(props.listSrc, props.genreSrc, props.favoriteKey, lang.value)

// 出展社リストの小見出し
const { getHeading, showHeading } = useExhibitorListHeading(exhibitorList, stateSort, lang.value)

// ジャンルの切り替えフラグ配列
const genreFlagList = ref<boolean[]>([])

// ジャンルの読み込み・ジャンルの切り替えフラグは配列の初期値セット
const genreList = computed<string[] | undefined>(() => {
  if (!genres.value) return undefined
  return genres.value?.map((item, index) => {
    genreFlagList.value[index] = true
    return item[lang.value === 'ja' ? 'name' : 'nameEng']
  })
})

// ジャンルの切り替えを監視してフィルター条件を更新
watch(genreFlagList.value, () => {
  if (!genreList.value) return
  stateGenres.value = []
  const list = genreList.value
  genreFlagList.value.forEach((flag, index) => {
    if (flag) {
      stateGenres.value.push(list[index])
    }
  })
})

// ソートのラベル
const sortLabel = {
  ja: { order: '50音順', koma: '小間番号順', search: '関連順' },
  en: { order: 'Name', koma: 'Booth number', search: 'Related' },
}

const updateSortToOrder = () => {
  const order: SortType = 'order'
  updateStateSort(order)
}

const updateSortToKoma = () => {
  const order: SortType = 'koma'
  updateStateSort(order)
}

// モーダルウインドウ
const { visible, show, dismiss } = useModal()
const currentExhibitor = ref<Exhibitor | undefined>()
const showModal = (exhibitor: Exhibitor) => {
  currentExhibitor.value = exhibitor
  show()
}

// フィルターのモーダル
const {
  visible: visibleFilterModal,
  show: showFilterModal,
  dismiss: dismissFilterModal,
} = useModal()
</script>

<template>
  <NContainer1col>
    <!-- 検索ツールバー -->
    <!-- ツールバー -->
    <NContainerFlex align-items="center" gap="2">
      <!-- キーワードフィルターのインプット -->
      <InputSearch
        v-model="stateKeyword"
        :datalist="genreList"
        class-name="grow"
        @update:model-value="updateStateSort('search')"
      ></InputSearch>

      <!-- フィルターボタン -->
      <BtnBase
        color="primary"
        variant="text"
        class="flex-none"
        prepend-icon="filter"
        class-name="w-40"
        :onClick="showFilterModal"
      >
        絞り込み
      </BtnBase>

      <!-- ソートボタン -->
      <BtnMenu
        :label="sortLabel[lang][stateSort]"
        color="primary"
        variant="text"
        class="flex-none"
        prepend-icon="sort"
        class-name="w-40"
      >
        <BtnBase color="primary" variant="text" class-name="w-full" :onClick="updateSortToOrder">{{
          sortLabel[lang].order
        }}</BtnBase>
        <BtnBase color="primary" variant="text" class-name="w-full" :onClick="updateSortToKoma">{{
          sortLabel[lang].koma
        }}</BtnBase>
      </BtnMenu>

      <!-- フィルターのモーダル -->
      <ModalBase :visible="visibleFilterModal" :close-action="dismissFilterModal">
        <NContainerGrid cols="2" gap="2">
          <SwitchBase
            v-for="(genre, index) in genreList"
            :key="index"
            v-model="genreFlagList[index]"
            :label="genre"
          ></SwitchBase>
        </NContainerGrid>
        <template #footer>
          <Btn color="gray" variant="text" :onClick="dismissFilterModal">Close</Btn>
        </template>
      </ModalBase>
    </NContainerFlex>

    <NCard>
      <!-- お気に入り登録切り替えタブ -->
      <NContainerFlex justify="between" class="border-b border-b-slate-200">
        <NContainerFlex align-items="center" gap="2">
          <TabsBase
            v-model="stateFavorite"
            name="stateFavorite"
            :values="[false, true]"
            :labels="
              lang === 'ja' ? ['すべて', 'お気に入り登録のみ'] : ['Show All', 'Show only favorites']
            "
            color="success"
          ></TabsBase>

          <!-- お気に入りフィルターのインフォメーション -->
          <NTooltipInfo location="top">
            <div v-if="lang === 'ja'">
              <p><b>お気に入り登録を表示機能：</b></p>
              <p>各出展社の★アイコンをクリックするとお気に入り登録することができます。</p>
              <p>
                ※お気に入り登録はブラウザに保存されるため、別の端末やブラウザには同期されません。
              </p>
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
        </NContainerFlex>
        <!-- フィルター後のリストの件数表示 -->
        <p>
          {{ lang === 'ja' ? '表示中の件数' : 'Search Result' }}: {{ numExhibitorList }} /
          {{ numRawExhibitorList }}
        </p>
      </NContainerFlex>

      <!-- 読み込み中 -->
      <LoadingSpinner v-if="isLoading" :show="true" message="loading..."></LoadingSpinner>

      <!-- フィルター後の件数が0件の場合の注意書き -->
      <ExhibitorListNotApplicable
        v-else-if="numExhibitorList === 0"
        :lang
      ></ExhibitorListNotApplicable>

      <!-- 出展社の一覧リスト -->
      <ul v-else class="divide-y">
        <template v-for="(exhibitor, index) in exhibitorList" :key="exhibitor.id">
          <ExhibitorListHeading v-if="showHeading(index)">
            {{ getHeading(index) }}
          </ExhibitorListHeading>
          <ExhibitorListItem
            :id="exhibitor.id"
            :koma="exhibitor.koma"
            :name="exhibitor.name"
            :contents="exhibitor.contents"
            :is-favorite="includedFavorites(exhibitor.id)"
            :favorite-method="switchFavorite"
            @click="showModal(exhibitor)"
          ></ExhibitorListItem>
        </template>
      </ul>
    </NCard>
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
        :isFavorite="includedFavorites(currentExhibitor.id)"
        :favorite-method="switchFavorite"
        :color="exhibitions.nexpo.color as Color"
      ></ExhibitorProfile>
      <p v-else>情報がありません。</p>
      <template #footer>
        <Btn color="gray" variant="text" :onClick="dismiss">Close</Btn>
      </template>
    </ModalBase>
  </NContainer1col>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
