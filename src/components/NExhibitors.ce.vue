<script setup lang="ts">
import { ref } from 'vue'
import NSwitch from '@/components/NSwitch.vue'
import NTabs from '@/components/NTabs.vue'
import NSwitcBookmark from '@/components/NSwitcBookmark.vue'
import NTooltipBookmark from '@/components/NTooltipBookmark.vue'

const nexpo = ref<boolean>(true)
const gwpe = ref<boolean>(true)

const sort = ref<'aiu' | 'koma'>('aiu')
const sort2 = ref('aaa')

const bookmark = ref<boolean>(false)
</script>

<template>
  <NSwitch id="nexpo" v-model="nexpo" label="NEW環境点" color="exhibition-a"></NSwitch>
  <NSwitch id="gwpe" v-model="gwpe" label="地球温暖化防止展" color="exhibition-b"></NSwitch>

  <p>{{ nexpo }}</p>
  <p>{{ gwpe }}</p>

  <NTabs
    v-model="sort"
    name="sort"
    :values="['aiu', 'koma']"
    :labels="['50音順', '小間番号順']"
  ></NTabs>

  <NTabs v-model="sort2" name="sort2" :values="['aaa', 'bbb', 'ccc']" color="info"></NTabs>

  <p>{{ sort }}</p>
  <p>{{ sort2 }}</p>

  <NSwitcBookmark name="bookmark" v-model="bookmark" color="success"></NSwitcBookmark>
  <NTooltipBookmark :active="bookmark"></NTooltipBookmark>
  <p>{{ bookmark }}</p>
</template>

<style>
@import url(../assets/css/main.css);
</style>
