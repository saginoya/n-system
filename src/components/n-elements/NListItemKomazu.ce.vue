<script setup lang="ts">
import NLink from '@/components/n-elements/NLink.ce.vue'

defineProps<{
  header: string
  update?: string
  withPit?: string
  withoutPit?: string
}>()
</script>

<template>
  <li class="border-b p-1 text-center">
    <div class="bg-slate-100 p-1 font-bold">{{ header }}</div>
    <div class="flex items-center justify-center gap-2 p-1">
      <span v-if="withPit">
        <n-link :href="withPit" type="pdf">PIT図あり</n-link>
      </span>
      <span v-if="withoutPit">
        <n-link :href="withoutPit" type="pdf">PIT図なし</n-link>
      </span>
      <span v-if="update">（{{ update }}更新）</span>
    </div>
  </li>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
