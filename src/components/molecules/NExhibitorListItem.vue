<script setup lang="ts">
import NChip from '@/components/atoms/NChip.ce.vue'
import NTooltipBookmark from '@/components/atoms/NTooltipBookmark.vue'
import type { Exhibitor } from '@/types'

const props = defineProps<{
  items: Exhibitor
  favorite: boolean
  favoriteMethod: (value: string) => void
}>()

const { id, koma, name, contents, color } = props.items
</script>

<template>
  <li>
    <div
      class="grid cursor-pointer grid-cols-5 items-center gap-4 py-2 hover:bg-slate-100 focus:bg-slate-100 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12"
    >
      <div class="text-center">
        <NChip :color="color || 'exhibition-a'">
          {{ koma }}
        </NChip>
      </div>
      <div class="col-span-3 sm:col-span-5 md:col-span-7 lg:col-span-10">
        <p v-html="name" class="font-bold"></p>
        <p v-html="contents" class="truncate text-gray-400"></p>
      </div>
      <div class="text-center">
        <NTooltipBookmark
          :active="favorite"
          color="success"
          @click.stop="favoriteMethod(id)"
        ></NTooltipBookmark>
      </div>
    </div>
  </li>
</template>
