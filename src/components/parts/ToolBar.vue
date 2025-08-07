<script setup lang="ts">
import ListNavItem from '@/components/parts/ListNavItem.vue'
import ListNavMenu from '@/components/parts/ListNavMenu.vue'
import { useRouter } from '@/composables/useRouter'
import { cn } from '@/lib/cn'
import { variantConceptMap } from '@/styles'
import type { Navigation } from '@/types'
import { getLinkOptions } from '@/utils'

defineProps<{
  title?: string
  navigation?: Navigation[]
}>()

const routerTop = useRouter().getLinkById('top')
const LinkTop = getLinkOptions(routerTop?.href ?? './', routerTop?.type ?? 'internal')

const baseButtonClass = cn(variantConceptMap['outlined']('primary'), 'border')
const languageButtonClass = cn(variantConceptMap['flat']('info'), 'border hover:text-info')
</script>

<template>
  <div class="bg-white/75 px-4 pb-2 pt-4">
    <div class="m-auto flex max-w-6xl justify-center align-bottom lg:justify-normal">
      <div class="flex-none">
        <a
          :href="LinkTop.href"
          :target="LinkTop.target"
          class="text-lg font-bold text-primary hover:opacity-75"
        >
          <slot>{{ title }}</slot>
        </a>
      </div>
      <div class="hidden grow lg:block"></div>
      <nav class="hidden flex-none lg:block">
        <div class="m-auto flex w-full max-w-5xl justify-between gap-4">
          <div v-for="item in navigation" :key="item.id">
            <ListNavMenu
              v-if="item.type === 'group'"
              :id="item.id"
              :name="item.name"
              :type="item.type"
              :children="item.children"
              :button-class="baseButtonClass"
            >
            </ListNavMenu>
            <ListNavItem
              v-else
              :path="item.children[0]"
              :class="item.id === 'language' ? languageButtonClass : baseButtonClass"
            ></ListNavItem>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
