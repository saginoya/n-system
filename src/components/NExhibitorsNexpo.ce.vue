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

import type { Exhibitor } from '@/types/exhibitorList'

const props = defineProps<{
  listSrc: string
  genreSrc: string
}>()
const { lang } = useLang()

const exhibitions = {
  nexpo: {
    ja: 'NEW環境展',
    en: 'N-EXPO',
    color: 'exhibition-a'
  },
  gwpe: {
    ja: '地球温暖化防止展',
    en: 'GWPE',
    color: 'exhibition-b'
  }
}

const {
  exhibitorList,
  setStateSort,
  setStateExhibition,
  validateExhibitor,
  stateKeyword,
  numberOfExhibitors,
  numberOfVisibleExhibitors,
  genres
} = useExhibitorList(lang.value, props.listSrc, props.genreSrc, exhibitions)

const genresList = computed(() => {
  if (!genres.value) return undefined
  return genres.value?.map((item) => item[lang.value === 'ja' ? 'name' : 'nameEng'])
})

const sort = ref<'name' | 'koma'>('name')

const nexpo = ref<boolean>(true)
const gwpe = ref<boolean>(true)

const bookmark = ref<boolean>(false)

watchEffect(() => {
  setStateExhibition(exhibitions.nexpo[lang.value], nexpo.value)
  setStateExhibition(exhibitions.gwpe[lang.value], gwpe.value)
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
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <div>
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

      <NSwitcBookmark name="bookmark" v-model="bookmark" color="success"></NSwitcBookmark>
    </div>
    <div class="flex items-center justify-between">
      <NTabs
        v-model="sort"
        name="sort"
        :values="['name', 'koma']"
        :labels="['50音順', '小間番号順']"
      ></NTabs>

      <NInputSearch v-model="stateKeyword" :datalist="genresList"></NInputSearch>
    </div>

    <p>表示中の件数: {{ numberOfVisibleExhibitors }} / {{ numberOfExhibitors }}</p>
  </div>

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
