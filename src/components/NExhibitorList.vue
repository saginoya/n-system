<script setup lang="ts">
import { ref } from 'vue'
import NChip from '@/components/NChip.ce.vue'
import NTooltipBookmark from '@/components/NTooltipBookmark.vue'
import NModal from '@/components/NModal.ce.vue'
import NExhibitorProfile from '@/components/NExhibitorProfile.vue'
import type { Lang } from '@/types/lang'
import type { Color } from '@/types/color'

type Exhibitor = {
  id: string
  name: string
  exhibitiion: string
  genre: string
  koma?: string
  color?: Color
  subName?: string
  webSite?: string
  contents?: string
  categories?: string[]
  sdgs?: number[]
}

defineProps<{
  lang: Lang
  list: Exhibitor[]
}>()

const modal = ref()
const currentExhibitor = ref<Exhibitor | undefined>()
const showModal = (exhibitor: Exhibitor) => {
  currentExhibitor.value = exhibitor
  modal.value.show()
}
</script>

<template>
  <ul class="divide-y">
    <template v-for="exhibitor in list" :key="exhibitor.id">
      <li>
        <div
          class="grid cursor-pointer grid-cols-5 items-center gap-4 py-2 hover:bg-slate-100 focus:bg-slate-100 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12"
          @click="showModal(exhibitor)"
        >
          <div class="text-center">
            <NChip :color="exhibitor.color || 'exhibition-a'">
              {{ exhibitor.koma }}
            </NChip>
          </div>
          <div class="col-span-3 sm:col-span-5 md:col-span-7 lg:col-span-10">
            <p v-html="exhibitor.name" class="font-bold"></p>
            <p v-html="exhibitor.contents" class="truncate text-gray-400"></p>
          </div>
          <div class="text-center">
            <NTooltipBookmark :active="false"></NTooltipBookmark>
          </div>
        </div>
      </li>
    </template>
  </ul>
  <NModal ref="modal">
    <p v-if="!currentExhibitor">情報がありません。</p>
    <NExhibitorProfile
      v-else
      :lang="lang"
      :name="currentExhibitor.name"
      :exhibitiion="currentExhibitor.exhibitiion"
      :genre="currentExhibitor.genre"
      :koma="currentExhibitor.koma"
      :sub-name="currentExhibitor.subName"
      :web-site="currentExhibitor.webSite"
      :contents="currentExhibitor.contents"
      :categories="currentExhibitor.categories"
      :sdgs="currentExhibitor.sdgs"
    ></NExhibitorProfile>
  </NModal>
</template>
