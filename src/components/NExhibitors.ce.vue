<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useExhibitorList } from '@/composables/useExhibitorList'
import { useLang } from '@/composables/useLang'

import NExhibitorListItem from '@/components/NExhibitorListItem.vue'
import NExhibitorProfile from '@/components/NExhibitorProfile.vue'
import NInputSearch from '@/components/NInputSearch.vue'
import NModal from '@/components/NModal.ce.vue'
import NSwitch from '@/components/NSwitch.vue'
import NSwitcBookmark from '@/components/NSwitcBookmark.vue'
import NTabs from '@/components/NTabs.vue'
import NTooltipBookmark from '@/components/NTooltipBookmark.vue'

import type { Exhibitor } from '@/types/exhibitorList'

const { lang } = useLang()

const {
  exhibitorList,
  setStateSort,
  setStateExhibition,
  validateExhibitor,
  stateKeyword,
  numberOfExhibitors,
  numberOfVisibleExhibitors,
  genres
} = useExhibitorList('ja', '/json/exhibitor-list2024.json', '/json/genres2024.json')

const genresList = computed(() => {
  if (!genres.value) return undefined
  return genres.value?.map((item) => item[lang.value === 'ja' ? 'name' : 'nameEng'])
})

const sort = ref<'name' | 'koma'>('name')

const nexpo = ref<boolean>(true)
const gwpe = ref<boolean>(true)

const bookmark = ref<boolean>(false)

watchEffect(() => {
  setStateExhibition('nexpo', nexpo.value)
  setStateExhibition('gwpe', gwpe.value)
  setStateSort(sort.value)
})

// モーダルウインドウ
const modal = ref()
const currentExhibitor = ref<Exhibitor | undefined>()
const showModal = (exhibitor: Exhibitor) => {
  currentExhibitor.value = exhibitor
  modal.value.show()
}
</script>

<template>
  <NSwitch id="nexpo" v-model="nexpo" label="NEW環境点" color="exhibition-a"></NSwitch>
  <NSwitch id="gwpe" v-model="gwpe" label="地球温暖化防止展" color="exhibition-b"></NSwitch>

  <NTabs
    v-model="sort"
    name="sort"
    :values="['name', 'koma']"
    :labels="['50音順', '小間番号順']"
  ></NTabs>

  <NInputSearch v-model="stateKeyword" :datalist="genresList"></NInputSearch>

  <NSwitcBookmark name="bookmark" v-model="bookmark" color="success"></NSwitcBookmark>
  <NTooltipBookmark :active="bookmark"></NTooltipBookmark>
  <p>{{ numberOfVisibleExhibitors }}/{{ numberOfExhibitors }}</p>

  <!-- 出展社の一覧リスト -->
  <ul class="divide-y">
    <template v-for="exhibitor in exhibitorList" :key="exhibitor.id">
      <NExhibitorListItem
        v-show="validateExhibitor(exhibitor)"
        :items="exhibitor"
        @click="showModal(exhibitor)"
      ></NExhibitorListItem>
    </template>
  </ul>

  <!-- モーダルウインドウ（出展社の詳細情報） -->
  <NModal ref="modal">
    <p v-if="!currentExhibitor">情報がありません。</p>
    <NExhibitorProfile v-else :lang="lang" :exhibitor="currentExhibitor"></NExhibitorProfile>
  </NModal>
</template>

<style>
@import url(../assets/css/main.css);
</style>
