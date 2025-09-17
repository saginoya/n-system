<script setup lang="ts">
import { ref, computed, watch, type ComputedRef } from 'vue'

import NCard from '@/components/n-elements/NCard.ce.vue'
import NContainer1col from '@/components/n-elements/NContainer1col.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NContainerGrid from '@/components/n-elements/NContainerGrid.ce.vue'
import NTitle from '@/components/n-elements/NTitle.ce.vue'
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

// ------------------
// Props
// ------------------

const props = defineProps<{
  listSrc: string
  genreSrc: string
  favoriteKey: string
}>()
const { lang } = useLang()

// ------------------
// 出展社リスト関連
// ------------------

// 出展社リスト
const {
  exhibitorList,
  numExhibitorList,
  numRawExhibitorList,
  genres,
  isLoading,
  stateSort,
  stateFavorite,
  stateKeyword,
  updateStateSort,
  updateStateGenres,
  switchFavorite,
  includedFavorites,
} = useExhibitorList(props.listSrc, props.genreSrc, props.favoriteKey, lang.value)

// 出展社リストの小見出し
const { getHeading, showHeading } = useExhibitorListHeading(exhibitorList, stateSort, lang.value)

// ------------------
// 展示会の種類とジャンル関連
// ------------------

type Exhibition = {
  ja: string
  en: string
  color: Color
  genres: string[]
  isOn: ComputedRef<boolean>
}

// 展示会の種類
const exhibitions: Record<string, Exhibition> = {
  nexpo: {
    ja: 'NEW環境展',
    en: 'N-EXPO',
    color: 'exhibition-a',
    genres: ['A', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'Z'],
    isOn: computed(() => isTrueGenreFlags(exhibitions.nexpo.genres)),
  },
  gwpe: {
    ja: '地球温暖化防止展',
    en: 'GWPE',
    color: 'exhibition-b',
    genres: ['B', 'C', 'D', 'E', 'F'],
    isOn: computed(() => isTrueGenreFlags(exhibitions.gwpe.genres)),
  },
} as const

// 読み込んだジャンルをMap化
const genreMap = computed<Record<string, string> | undefined>(() => {
  if (!genres.value) return undefined
  return Object.fromEntries(
    genres.value.map((item) => {
      // ジャンルの絞り込み条件フラグ配列を初期化
      genreFlags.value[item.id] = true

      return [item.id, item[lang.value === 'ja' ? 'name' : 'nameEng']]
    }),
  )
})

// ジャンルのリスト
const genreList = computed<string[] | undefined>(() => {
  if (!genreMap.value) return undefined
  return Object.values(genreMap.value)
})

// ------------------
// ジャンルによる絞り込み機能関連
// ------------------

// ジャンルの絞り込み条件フラグ配列
const genreFlags = ref<Record<string, boolean>>({})

// ジャンルの絞り込み条件フラグ配列の指定したキー配列のすべてがtrueか検査する
const isTrueGenreFlags = (keys: string[]): boolean => {
  const array: boolean[] = []
  keys.forEach((key) => {
    array.push(genreFlags.value[key])
  })
  return array.every((value) => value === true)
}

// ジャンルの絞り込み条件フラグをキー配列から一括更新する関数
const updateGenreFlags = (keys: string[], value: boolean): void => {
  keys.forEach((key) => {
    genreFlags.value[key] = value
  })
}

// ジャンルの絞り込み条件を監視して更新
watch(genreFlags.value, () => {
  if (!genreMap.value) return

  const newValues = []
  for (const key in genreFlags.value) {
    if (genreFlags.value[key]) {
      newValues.push(genreMap.value[key])
    }
  }
  updateStateGenres(newValues)
})

// ------------------
// ソート関連
// ------------------

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

// ------------------
// モーダル制御
// ------------------

// 出展社カードのモーダル
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
        @update:model-value="stateKeyword && updateStateSort('search')"
      ></InputSearch>

      <NContainerFlex justify="center" class="w-full flex-none sm:w-auto">
        <!-- フィルターボタン -->
        <BtnBase color="primary" variant="text" prepend-icon="filter" :onClick="showFilterModal">
          絞り込み
        </BtnBase>

        <!-- ソートボタン -->
        <BtnMenu
          :label="sortLabel[lang][stateSort]"
          color="primary"
          variant="text"
          prepend-icon="sort"
        >
          <BtnBase
            color="primary"
            variant="text"
            class-name="w-full"
            :onClick="updateSortToOrder"
            >{{ sortLabel[lang].order }}</BtnBase
          >
          <BtnBase color="primary" variant="text" class-name="w-full" :onClick="updateSortToKoma">{{
            sortLabel[lang].koma
          }}</BtnBase>
        </BtnMenu>
      </NContainerFlex>

      <!-- フィルターのモーダル -->
      <ModalBase :visible="visibleFilterModal" :close-action="dismissFilterModal">
        <NTitle>展示会・エリアによる絞り込み</NTitle>
        <NContainerGrid cols="2" gap="2" v-if="genreMap">
          <NContainer1col v-for="exhibition in exhibitions" :key="exhibition.en" gap="0">
            <SwitchBase
              v-model="exhibition.isOn.value"
              :label="`${exhibition[lang === 'ja' ? 'ja' : 'en']}のすべてのエリア`"
              :color="exhibition.color"
              label-class="font-bold text-lg"
              @update:model-value="(val) => updateGenreFlags(exhibition.genres, val)"
            ></SwitchBase>
            <SwitchBase
              v-for="genreID in exhibition.genres"
              :key="genreID"
              v-model="genreFlags[genreID]"
              :label="genreMap[genreID]"
              :color="exhibition.color"
              label-class="font-bold"
            ></SwitchBase>
          </NContainer1col>
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
            :color="exhibitions[exhibitor.exhibition].color as Color"
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
        :exhibition="exhibitions[currentExhibitor.exhibition][lang]"
        :subName="currentExhibitor.subName"
        :genre="currentExhibitor.genre"
        :webSite="currentExhibitor.webSite"
        :contents="currentExhibitor.contents"
        :sdgs="currentExhibitor.sdgs"
        :isFavorite="includedFavorites(currentExhibitor.id)"
        :favorite-method="switchFavorite"
        :color="exhibitions[currentExhibitor.exhibition].color"
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
