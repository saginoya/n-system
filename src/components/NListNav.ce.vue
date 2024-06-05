<script setup lang="ts">
import { useLinkComp } from '@/utils/useLinkComp'
import { useURL } from '@/utils/useURL'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()

const { getLinkCompName } = useLinkComp()
const { samePathname } = useURL()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <component
        :is="getLinkCompName(link.type)"
        :href="link.path"
        class="hover:bg-white/30 focus:bg-white/30"
        :class="{ 'bg-black/20': samePathname(link.path) }"
      >
        {{ link.name }}
      </component>
    </li>
  </ul>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
