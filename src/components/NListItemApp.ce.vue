<script setup lang="ts">
defineProps<{
  id: string
  data: string
  dataType: string
  dataSize: number
  period: string
  destination: string
  email: string
  required?: boolean
  showHeader?: boolean
}>()

const headers = ['項目', 'データ', '提出書類内容', '提出期限', '提出先', '対象']
</script>

<template>
  <li
    v-if="showHeader"
    class="grid grid-cols-12 items-center divide-x border-y bg-slate-100 p-1 text-center font-bold"
  >
    <span class="col-span-1">
      {{ headers[0] }}
    </span>
    <span class="col-span-1">
      {{ headers[1] }}
    </span>
    <span class="col-span-4">
      {{ headers[2] }}
    </span>
    <span class="col-span-2">
      {{ headers[3] }}
    </span>
    <span class="col-span-2">
      {{ headers[4] }}
    </span>
    <span class="col-span-2">
      {{ headers[5] }}
    </span>
  </li>
  <li class="grid grid-cols-12 items-center border-y p-1">
    <span class="col-span-1 text-center">
      {{ id }}
    </span>
    <span class="col-span-1 text-center">
      <a :href="data" download
        >{{ dataType }}<br />
        ({{ dataSize }}KB)</a
      >
    </span>
    <span class="col-span-4">
      <slot />
    </span>
    <span class="col-span-2 text-center">{{ period }}</span>
    <span class="col-span-2 text-center">
      <p>{{ destination }}</p>
      <p>{{ email }}</p>
    </span>
    <span class="col-span-2 text-center">
      <span v-if="required" class="text-red-500">全出展社必須</span>
      <span v-else>該当出展社のみ</span>
    </span>
  </li>
</template>

<style>
@import url(../assets/css/main.css);
</style>
