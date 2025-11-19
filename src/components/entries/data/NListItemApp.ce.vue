<script setup lang="ts">
import NChip from '@/components/entries/parts/NChip.ce.vue'

defineProps<{
  id: string
  data: string
  dataType: string
  dataSize?: string
  showHeader?: boolean
}>()

const headers = ['様式', '書類内容', 'ダウンロード']
</script>

<template>
  <li
    v-if="showHeader"
    class="hidden list-none items-center divide-x border-y bg-slate-100 p-1 text-center font-bold md:grid md:grid-cols-5"
  >
    <div class="col-span-1">
      {{ headers[0] }}
    </div>
    <div class="col-span-3">
      {{ headers[1] }}
    </div>
    <div class="col-span-1">
      {{ headers[2] }}
    </div>
  </li>
  <li class="grid list-none grid-cols-1 items-center border-y p-1 hover:bg-blue-50 md:grid-cols-5">
    <div class="col-span-1 bg-slate-100 font-bold md:bg-inherit md:text-center">
      {{ id }}
    </div>
    <div class="col-span-1 md:col-span-3">
      <slot />
    </div>
    <div class="col-span-1 text-center">
      <p>
        <NChip color="success" :href="data" type="download"> ダウンロード </NChip>
      </p>
      <p class="flex justify-center gap-1 text-sm">
        <span>{{ dataType }}</span>
        <span v-if="dataSize">{{ dataSize }}</span>
      </p>
    </div>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
