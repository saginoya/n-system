<script setup lang="ts">
import { ref, watch } from 'vue'

import GlobalHeader from '@/components/parts/GlobalHeader.vue'
import HeaderTool from '@/components/parts/HeaderTool.vue'
import ListNavRow from '@/components/parts/ListNavRow.vue'
import OverlayBase from '@/components/parts/OverlayBase.vue'
import { useConfig } from '@/composables/useConfigV3'
import { useDrawer } from '@/composables/useDrawer'
import { useRouter } from '@/composables/useRouter'
import type { Router } from '@/types'

const { getByIds, isReady } = useRouter()

const props = defineProps<{
  jsonPath: string
}>()
const { siteTitle, copyright, navigation } = useConfig(props.jsonPath)
const { drawer, operateDrawer, dismissDrawer } = useDrawer()

const headerLinks = ref<Router[]>([])
const footerLinks = ref<Router[]>([])

watch(isReady, () => {
  headerLinks.value = getByIds(['sample', 'top'])
  footerLinks.value = getByIds(['sample', 'bottom'])
})
</script>

<template>
  <GlobalHeader
    v-if="siteTitle && navigation"
    :titleList="siteTitle"
    :navigation
    class="fixed left-0 top-0 z-40 h-screen w-96 max-w-full -translate-x-96 transition duration-200"
    :class="{ 'translate-x-0': drawer }"
  ></GlobalHeader>
  <OverlayBase v-show="drawer" class="z-30" @click="dismissDrawer()"></OverlayBase>
  <HeaderTool :active="drawer" class="z-50" @click="operateDrawer()"></HeaderTool>
  <div class="flex min-h-screen w-full flex-col overflow-hidden bg-slate-200">
    <div v-if="navigation" class="hidden bg-primary px-4 py-2 text-white lg:block">
      <nav>
        <ListNavRow :navigation />
      </nav>
    </div>
    <main class="flex flex-1 justify-center px-4 py-8">
      <div class="flex w-full max-w-screen-lg flex-col gap-12 py-6">
        <slot />
      </div>
    </main>
    <footer class="bg-primary px-4 text-center text-white">
      <div v-if="navigation" class="hidden py-2 lg:block">
        <ListNavRow :navigation></ListNavRow>
      </div>
      <hr />
      <div class="py-2">
        {{ copyright }}
      </div>
    </footer>
  </div>
</template>
