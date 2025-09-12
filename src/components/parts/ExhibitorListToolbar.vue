<script setup lang="ts">
import { ref } from 'vue'

import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import BtnBase from '@/components/parts/BtnBase.vue'
import BtnMenu from '@/components/parts/BtnMenu.vue'
import InputSearch from '@/components/parts/InputSearch.vue'
// import ModalBase from '@/components/parts/ModalBase.vue'
// import SwitchBase from '@/components/parts/SwitchBase.vue'
import type { Lang, SortType } from '@/types'

const props = defineProps<{
  lang: Lang
  genres: string[] | undefined
  initSort: SortType
  updateKeywordsFunc: (value: string) => void
  updateSortFunc: (value: SortType) => void
}>()

const stateSort = ref<SortType>(props.initSort)
const stateKeyword = ref<string>('')
// const stateFavorite = ref<boolean>()

// ソートのラベル
const sortLabel = {
  ja: { order: '50音順', koma: '小間番号順', search: '関連順' },
  en: { order: 'Name', koma: 'Booth number', search: 'Related' },
}

const updateSortToOrder = () => {
  const order: SortType = 'order'
  props.updateSortFunc(order)
  stateSort.value = order
}

const updateSortToKoma = () => {
  const order: SortType = 'koma'
  props.updateSortFunc(order)
  stateSort.value = order
}

// 展示会フィルター条件
/* const nexpo = ref<boolean>(true)
const gwpe = ref<boolean>(true) */
</script>

<template>
  <!-- ツールバー -->
  <NContainerFlex align-items="center" gap="2">
    <!-- キーワードフィルターのインプット -->
    <InputSearch
      v-model="stateKeyword"
      :datalist="genres"
      class-name="grow"
      @update:model-value="updateKeywordsFunc(stateKeyword)"
    ></InputSearch>

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

    <BtnBase
      color="primary"
      variant="text"
      class="flex-none"
      prepend-icon="filter"
      class-name="w-40"
    >
      絞り込み
    </BtnBase>

    <!-- 絞り込みのモーダル -->
  </NContainerFlex>
</template>
