<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useDrawer } from '@/composables/useDrawer'

const props = defineProps<{
  jsonPath: string
  page: 'top' | undefined
}>()
const { siteTitle, copyright, mainVisual, navigation } = useConfig(props.jsonPath)
const { drawer, operateDrawer } = useDrawer()
</script>

<template>
  <div class="flex min-h-screen w-full flex-col overflow-hidden bg-slate-200">
    <n-header
      v-if="siteTitle && navigation"
      :titleList="siteTitle"
      :nav="navigation"
      class="fixed left-0 top-0 z-40 h-screen w-96 max-w-full -translate-x-96 transition duration-200"
      :class="{ 'translate-x-0': drawer }"
    ></n-header>
    <n-main-visual
      v-if="mainVisual"
      :nav="navigation?.lang"
      :image="page === 'top' ? mainVisual.top : mainVisual.lower"
    >
    </n-main-visual>
    <n-global-nav v-if="navigation" :nav="navigation.header" />
    <n-main class="flex flex-1 justify-center py-1">
      <slot />
    </n-main>
    <n-footer :nav="navigation?.footer" class="text-center">{{ copyright }}</n-footer>
    <n-header-tool :active="drawer" class="z-50" @click="operateDrawer()"></n-header-tool>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
