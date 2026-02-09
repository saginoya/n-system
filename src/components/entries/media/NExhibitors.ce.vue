<script setup lang="ts">
import NCard from '@/components/entries/layouts/NCard.ce.vue'
import NContainer1col from '@/components/entries/layouts/NContainer1col.ce.vue'
import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
import NContainerGrid from '@/components/entries/layouts/NContainerGrid.ce.vue'
import NChip from '@/components/entries/parts/NChip.ce.vue'
import NTitle from '@/components/entries/parts/NTitle.ce.vue'
import BtnMenu from '@/components/features/BtnMenu.vue'
import ExhibitorProfile from '@/components/features/exhibitors/ExhibitorProfile.vue'
import InfoFavorite from '@/components/features/exhibitors/InfoFavorite.vue'
import ListHeading from '@/components/features/exhibitors/ListHeading.vue'
import ListItem from '@/components/features/exhibitors/ListItem.vue'
import NotApplicable from '@/components/features/exhibitors/NotApplicable.vue'
import BtnBase from '@/components/ui/BtnBase.vue'
import InputSearch from '@/components/ui/InputSearch.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import SwitchBase from '@/components/ui/SwitchBase.vue'
import TabsBase from '@/components/ui/TabsBase.vue'
import {
  useExhibitorData,
  useExhibitorListTransformer,
  useExhibitorProfile,
  useFavorites,
  useGenreFilter,
  useHeading,
  useStateFavorite,
  useStateGenres,
  useStateKeyword,
  useStateOverseas,
  useStateSort,
} from '@/composables/exhibitors'
import { useGenres } from '@/composables/useGenres'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'
import type { Exhibitor } from '@/types'

// ------------------
// Props
// ------------------

const props = defineProps<{
  listSrc: string
  genreSrc: string
  favoriteKey: string
}>()

// ------------------
// 言語
// ------------------

const { lang, isJapanese } = useLang()

// ------------------
// ジャンル
// ------------------

const { exhibitions, exhibitionsMap, genresMap, genreLists, getGenreNameFromID } = useGenres(
  props.genreSrc,
)

// ------------------
// コアデータ
// ------------------

const { rawExhibitorList, numRawExhibitorList, isLoading } = useExhibitorData(
  props.listSrc,
  lang.value,
  getGenreNameFromID,
)

// ------------------
// ユーザー状態
// ------------------

// ソートの条件
const { stateSort, updateStateSort, sortLabel, updateSortToOrder, updateSortToKoma } =
  useStateSort()

// キーワードの条件
const { stateKeyword, removeStateKeyword } = useStateKeyword()

// お気に入りの表示状態
const { stateFavorite } = useStateFavorite()

// ジャンルの絞り込み状態
const { stateGenres, updateStateGenres } = useStateGenres()

// 海外・国内の絞り込み状態
const { stateOverseas, updateStateOverseas, removeStateOverseas } = useStateOverseas()

// ------------------
// お気に入りの管理
// ------------------

const { myFavorites, numMyFavorites, switchFavorite, includedFavorites } = useFavorites(
  props.favoriteKey,
  lang.value,
)

// ------------------
// フィルタロジック
// ------------------

const { exhibitorList, numExhibitorList } = useExhibitorListTransformer(rawExhibitorList, {
  favorite: stateFavorite,
  myFavorites: myFavorites,
  genres: stateGenres,
  overseas: stateOverseas,
  keyword: stateKeyword,
  sort: stateSort,
})

// ------------------
// リストの小見出し
// ------------------
const { getHeading, showHeading } = useHeading(exhibitorList, stateSort)

// ------------------
// 出展社の詳細情報モーダル管理
// ------------------
const { visible, show, dismiss } = useModal()
const { currentExhibitor, setCurrentExhibitor, resetCurrentExhibitor } =
  useExhibitorProfile(exhibitionsMap)

const showModal = (exhibitor: Exhibitor) => {
  setCurrentExhibitor(exhibitor, lang.value)
  show()
}
const dismissModal = () => {
  resetCurrentExhibitor()

  dismiss()
}

// ------------------
// フィルターのモーダル
// ------------------

const {
  visible: visibleFilterModal,
  show: showFilterModal,
  dismiss: dismissFilterModal,
} = useModal()

// ------------------
// ジャンルによる絞り込み機能の制御
// ------------------

const { genreFlags, updateGenreFlags, removeGenreFlags, exhibitionOptions, isFilteringByGenre } =
  useGenreFilter(exhibitions, genresMap, updateStateGenres, lang.value)
</script>

<template>
  <NContainer1col>
    <!-- 検索ツールバー -->
    <NContainerFlex align-items="center" gap="2">
      <!-- キーワードフィルターのインプット -->
      <InputSearch
        v-model="stateKeyword"
        :datalist="genreLists[lang]"
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
          :children="[
            {
              color: 'primary',
              label: sortLabel[lang].order,
              onClick: updateSortToOrder,
            },
            {
              color: 'primary',
              label: sortLabel[lang].koma,
              onClick: updateSortToKoma,
            },
          ]"
        />
      </NContainerFlex>

      <!-- フィルターのモーダル -->
      <ModalBase :visible="visibleFilterModal" :close-action="dismissFilterModal">
        <NContainer1col gap="8">
          <section>
            <NTitle>{{ isJapanese ? '所在地よる絞り込み' : 'Filter by Location' }}</NTitle>
            <NContainerGrid cols="2" gap="2">
              <SwitchBase
                v-model="stateOverseas"
                :label="isJapanese ? '海外の出展社のみ' : 'Overseas only'"
                label-class="font-bold text-lg"
                @update:model-value="
                  (val) => (val ? updateStateOverseas(val) : removeStateOverseas())
                "
              ></SwitchBase>
            </NContainerGrid>
          </section>
          <section>
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
                  :label="genresMap[genreID]?.[isJapanese ? 'name' : 'nameEng'] ?? ''"
                  :color="exhibition.color"
                  label-class="font-bold"
                ></SwitchBase>
              </NContainer1col>
            </NContainerGrid>
          </section>
        </NContainer1col>
        <template #footer>
          <BtnBase color="gray" variant="text" :onClick="dismissFilterModal">Close</BtnBase>
        </template>
      </ModalBase>
    </NContainerFlex>

    <!-- 状態の表示スペース -->
    <NContainerFlex>
      <NChip v-if="stateKeyword" color="primary" size="sm" :closable="removeStateKeyword">{{
        stateKeyword
      }}</NChip>
      <NChip v-if="isFilteringByGenre" color="primary" size="sm" :closable="removeGenreFlags">
        {{ isJapanese ? 'エリア条件設定中' : 'Setting area conditions' }}</NChip
      >
      <NChip
        v-if="stateOverseas !== undefined"
        color="primary"
        size="sm"
        :closable="removeStateOverseas"
      >
        {{
          stateOverseas ? (isJapanese ? '海外' : 'Overseas') : isJapanese ? '国内' : 'Japanese'
        }}</NChip
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
          <InfoFavorite :lang="lang"></InfoFavorite>
        </NContainerFlex>

        <!-- フィルター後のリストの件数表示 -->
        <p>
          {{ lang === 'ja' ? '表示中の件数' : 'Search Result' }}: {{ numExhibitorList }} /
          {{ numRawExhibitorList }}
        </p>
      </NContainerFlex>

      <!-- 読み込み中 -->
      <LoadingSpinner v-if="isLoading" :show="true" message="loading..."></LoadingSpinner>

      <!-- 出展社の一覧リスト -->
      <ul v-else-if="numExhibitorList" class="divide-y">
        <template v-for="(exhibitor, index) in exhibitorList" :key="exhibitor.id">
          <ListHeading v-if="showHeading(index)">
            {{ getHeading(index) }}
          </ListHeading>
          <ListItem
            :id="exhibitor.id"
            :koma="exhibitor.koma"
            :name="exhibitor.name"
            :contents="exhibitor.contents"
            :color="
              exhibitor.exhibition ? exhibitionsMap[exhibitor.exhibition]?.color : 'exhibition-a'
            "
            :is-favorite="includedFavorites(exhibitor.id)"
            :favorite-method="switchFavorite"
            @click="showModal(exhibitor)"
          ></ListItem>
        </template>
      </ul>

      <!-- フィルター後の件数が0件の場合の注意書き -->
      <NotApplicable v-else :lang></NotApplicable>
    </NCard>

    <!-- モーダルウインドウ（出展社の詳細情報） -->
    <ModalBase :visible :close-action="dismissModal">
      <ExhibitorProfile
        v-if="currentExhibitor"
        v-bind="currentExhibitor"
        :favoriteMethod="switchFavorite"
        :is-favorite="includedFavorites(currentExhibitor.id)"
      ></ExhibitorProfile>
      <p v-else>情報がありません。</p>
      <template #footer>
        <BtnBase color="gray" variant="text" :onClick="dismissModal">Close</BtnBase>
      </template>
    </ModalBase>
  </NContainer1col>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
