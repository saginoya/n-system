<script setup lang="ts">
import NHeader from '@/components/NHeader.vue'
import NHeaderTool from '@/components/NHeaderTool.vue'
import NMainVisual from '@/components/NMainVisual.vue'
import NListNavRow from './NListNavRow.ce.vue'
import { useConfig } from '@/composables/useConfig'
import { useDrawer } from '@/composables/useDrawer'

const props = defineProps<{
  jsonPath: string
}>()
const { siteTitle, copyright, mainVisual, navigation } = useConfig(props.jsonPath)
const { drawer, operateDrawer } = useDrawer()
</script>

<template>
  <NHeader
    v-if="siteTitle && navigation"
    :titleList="siteTitle"
    :nav="navigation"
    class="fixed left-0 top-0 z-40 h-screen w-96 max-w-full -translate-x-96 transition duration-200"
    :class="{ 'translate-x-0': drawer }"
  ></NHeader>
  <NHeaderTool :active="drawer" class="z-50" @click="operateDrawer()"></NHeaderTool>
  <div class="flex min-h-screen w-full flex-col overflow-hidden bg-slate-200">
    <NMainVisual v-if="mainVisual" :nav="navigation?.related" :image="mainVisual.lower">
    </NMainVisual>
    <div v-if="navigation" class="hidden bg-primary px-4 py-2 text-white lg:block">
      <nav>
        <n-list-nav-row :links="navigation.header" />
      </nav>
    </div>
    <main class="flex flex-1 justify-center px-4 py-8">
      <div class="flex w-full max-w-screen-lg flex-col gap-12 py-6">
        <slot />
      </div>
    </main>
    <footer class="bg-primary px-4 text-center text-white">
      <div v-if="navigation?.footer" class="hidden py-2 lg:block">
        <n-list-nav-row :links="navigation?.footer"> </n-list-nav-row>
      </div>
      <hr />
      <div class="py-2">
        {{ copyright }}
      </div>
    </footer>
  </div>
</template>
