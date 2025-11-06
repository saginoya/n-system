<script setup lang="ts">
import { ref, computed, watch, type ComputedRef } from 'vue'

import NCard from '@/components/n-elements/NCard.ce.vue'
import NChip from '@/components/n-elements/NChip.ce.vue'
import NContainer1col from '@/components/n-elements/NContainer1col.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NContainerGrid from '@/components/n-elements/NContainerGrid.ce.vue'
import NTitle from '@/components/n-elements/NTitle.ce.vue'
import NTooltipInfo from '@/components/n-elements/NTooltipInfo.ce.vue'
import Btn from '@/components/parts/BtnBase.vue'
import BtnBase from '@/components/parts/BtnBase.vue'
import type { BtnBaseProps } from '@/components/parts/BtnBase.vue'
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
import { useGenres } from '@/composables/useGenres'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'
import type { Exhibitor, Color, SortType, ExhibitionID, GenreID } from '@/types'

// ------------------
// Props
// ------------------

const props = defineProps<{
  listSrc: string
  genreSrc: string
  favoriteKey: string
}>()

// ------------------
// 言語関連
// ------------------

const { lang } = useLang()
const isJapanese = computed<boolean>(() => lang.value === 'ja')
const langKey = computed(() => (isJapanese.value ? 'name' : 'nameEng'))

// ------------------
// 展示会の種類とジャンル関連
// ------------------

// ジャンルを取得
const { exhibitions, exhibitionsMap, genresMap, getGenreNameFromID } = useGenres(props.genreSrc)

// ジャンルのリスト
const genreList = computed<string[] | undefined>(() => {
  if (!genresMap.value) return undefined
  const map = genresMap.value
  return Object.values(map).map((item) => item[langKey.value])
})

// 絞り込みが行われているかの判定
const isFilteringByGenre = computed<boolean>(() => {
  if (!genreList.value) return false
  const allGenresNum: number = genreList.value.length
  const validGenresNum: number = stateGenres.value.length
  return allGenresNum !== validGenresNum
})

// ------------------
// 出展社リスト関連
// ------------------

// 出展社リスト
const {
  exhibitorList,
  numExhibitorList,
  numRawExhibitorList,
  numMyFavorites,
  isDataReady,
  stateSort,
  stateFavorite,
  stateKeyword,
  stateGenres,
  removeStateKeyword,
  updateStateSort,
  updateStateGenres,
  switchFavorite,
  includedFavorites,
} = useExhibitorList(props.listSrc, props.favoriteKey, lang.value, getGenreNameFromID)

// 出展社リストの小見出し
const { getHeading, showHeading } = useExhibitorListHeading(exhibitorList, stateSort, lang.value)

// ------------------
// ジャンルによる絞り込み機能関連
// ------------------

// ジャンルの絞り込み条件フラグ配列
const genreFlags = ref<Record<GenreID, boolean>>({})

// ジャンルの絞り込み条件フラグ配列を指定したキー配列で初期化する関数
const initGenreFlags = (keys: GenreID[]): void => {
  keys.forEach((key) => {
    genreFlags.value[key] = true
  })
}

// 展示会・エリアごとのジャンルの絞り込み条件のためのオブジェクト配列
type ExhibitionOptions = {
  id: ExhibitionID
  label: string
  color: Color
  genres: GenreID[]
  isOn: ComputedRef<boolean>
}
const exhibitionOptions = computed<ExhibitionOptions[]>(() => {
  if (!exhibitions.value) return []
  const result: ExhibitionOptions[] = []
  exhibitions.value.forEach((item) => {
    result.push({
      id: item.id,
      label: `${item[langKey.value]}${isJapanese.value ? 'のすべてのエリア' : ''}`,
      color: item.color,
      genres: [...item.genres],
      isOn: computed(() => isTrueGenreFlags([...item.genres])),
    })
  })

  // ジャンルの絞り込み条件フラグ配列を初期化※本当は分けたいので後で修正したい
  const genreKeys = Object.keys(genresMap.value)
  initGenreFlags(genreKeys)

  return result
})

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

const removeGenreFlags = () => {
  Object.keys(genreFlags.value).forEach((key) => {
    genreFlags.value[key] = true
  })
}

// ジャンルの絞り込み条件を監視して更新
watch(genreFlags.value, () => {
  if (!genresMap.value) return

  const newValues: string[] = []
  for (const key in genreFlags.value) {
    if (genreFlags.value[key]) {
      newValues.push(genresMap.value[key]['id'])
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

// ソートの更新関数
const updateSortToOrder = () => {
  const order: SortType = 'order'
  updateStateSort(order)
}
const updateSortToKoma = () => {
  const order: SortType = 'koma'
  updateStateSort(order)
}

// ソートメニューの子要素
const sortChildren: BtnBaseProps[] = [
  {
    color: 'primary',
    label: sortLabel[lang.value].order,
    onClick: updateSortToOrder,
  },
  {
    color: 'primary',
    label: sortLabel[lang.value].koma,
    onClick: updateSortToKoma,
  },
]

// ------------------
// モーダル制御
// ------------------

// 出展社カードのモーダル
const { visible, show, dismiss } = useModal()
const currentExhibitor = ref()
const showModal = (exhibitor: Exhibitor) => {
  const exhibition = exhibitor.exhibition
    ? exhibitionsMap.value[exhibitor.exhibition][langKey.value]
    : undefined

  const color = exhibitor.exhibition ? exhibitionsMap.value[exhibitor.exhibition].color : undefined

  currentExhibitor.value = {
    lang: lang.value,
    id: exhibitor.id,
    name: exhibitor.name,
    koma: exhibitor.koma,
    favoriteMethod: switchFavorite,
    overseas: exhibitor.overseas,
    country: exhibitor.country,
    exhibition: exhibition,
    subName: exhibitor.subName,
    genre: exhibitor.genreName,
    webSite: exhibitor.webSite,
    contents: exhibitor.contents,
    sdgs: exhibitor.sdgs,
    color: color,
  }

  show()
}
const dismissModal = () => {
  currentExhibitor.value = undefined

  dismiss()
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
    <NContainerFlex align-items="center" gap="2">
      <!-- キーワードフィルターのインプット -->
      <InputSearch
        v-model="stateKeyword"
        :datalist="genreList"
        class-name="grow"
        :placeholder="isJapanese ? 'キーワードで検索' : 'Search by keyword'"
        @update:model-value="stateKeyword ? updateStateSort('search') : updateStateSort('order')"
      ></InputSearch>

      <NContainerFlex justify="center" class="w-full flex-none sm:w-auto">
        <!-- フィルターボタン -->
        <BtnBase color="primary" variant="text" prepend-icon="filter" :onClick="showFilterModal">
          {{ isJapanese ? '絞り込み条件' : 'Filter' }}
        </BtnBase>

        <!-- ソートボタン -->
        <BtnMenu
          :label="sortLabel[lang][stateSort]"
          color="primary"
          variant="text"
          prepend-icon="sort"
          :children="sortChildren"
        />
      </NContainerFlex>

      <!-- フィルターのモーダル -->
      <ModalBase :visible="visibleFilterModal" :close-action="dismissFilterModal">
        <NTitle>{{
          isJapanese ? '展示会・エリアによる絞り込み' : 'Filter by Exhibition/Area'
        }}</NTitle>
        <NContainerGrid cols="2" gap="2" v-if="genresMap">
          <NContainer1col v-for="exhibition in exhibitionOptions" :key="exhibition.id" gap="0">
            <SwitchBase
              v-model="exhibition.isOn.value"
              :label="exhibition.label"
              :color="exhibition.color"
              label-class="font-bold text-lg"
              @update:model-value="(val) => updateGenreFlags(exhibition.genres, val)"
            ></SwitchBase>
            <SwitchBase
              v-for="genreID in exhibition.genres"
              :key="genreID"
              v-model="genreFlags[genreID]"
              :label="genresMap[genreID][langKey]"
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

    <!-- 状態の表示スペース -->
    <NContainerFlex>
      <NChip v-if="stateKeyword" color="primary" size="sm" :closable="removeStateKeyword">{{
        stateKeyword
      }}</NChip>
      <NChip v-if="isFilteringByGenre" color="primary" size="sm" :closable="removeGenreFlags">
        {{ isJapanese ? '絞り込み条件設定中' : 'Setting filter conditions' }}</NChip
      >
    </NContainerFlex>
    <!-- メインの一覧カード -->
    <NCard>
      <!-- お気に入り登録切り替えタブ -->
      <NContainerFlex justify="between" class="border-b border-b-slate-200">
        <NContainerFlex align-items="center" gap="2">
          <TabsBase
            v-model="stateFavorite"
            name="stateFavorite"
            :values="[false, true]"
            :labels="
              lang === 'ja'
                ? ['すべて', `お気に入り登録のみ(${numMyFavorites})`]
                : ['Show All', `Show only favorites (${numMyFavorites})`]
            "
            color="success"
          ></TabsBase>

          <!-- お気に入りフィルターのインフォメーション -->
          <NTooltipInfo icon="question">
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
      <LoadingSpinner v-if="!isDataReady" :show="true" message="loading..."></LoadingSpinner>

      <!-- 出展社の一覧リスト -->
      <ul v-else-if="numExhibitorList" class="divide-y">
        <template v-for="(exhibitor, index) in exhibitorList" :key="exhibitor.id">
          <ExhibitorListHeading v-if="showHeading(index)">
            {{ getHeading(index) }}
          </ExhibitorListHeading>
          <ExhibitorListItem
            :id="exhibitor.id"
            :koma="exhibitor.koma"
            :name="exhibitor.name"
            :contents="exhibitor.contents"
            :color="
              exhibitor.exhibition ? exhibitionsMap[exhibitor.exhibition].color : 'exhibition-a'
            "
            :is-favorite="includedFavorites(exhibitor.id)"
            :favorite-method="switchFavorite"
            @click="showModal(exhibitor)"
          ></ExhibitorListItem>
        </template>
      </ul>

      <!-- フィルター後の件数が0件の場合の注意書き -->
      <ExhibitorListNotApplicable v-else :lang></ExhibitorListNotApplicable>
    </NCard>

    <!-- モーダルウインドウ（出展社の詳細情報） -->
    <ModalBase :visible :close-action="dismissModal">
      <ExhibitorProfile
        v-if="currentExhibitor"
        v-bind="currentExhibitor"
        :is-favorite="includedFavorites(currentExhibitor.id)"
      ></ExhibitorProfile>
      <p v-else>情報がありません。</p>
      <template #footer>
        <Btn color="gray" variant="text" :onClick="dismissModal">Close</Btn>
      </template>
    </ModalBase>
  </NContainer1col>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
