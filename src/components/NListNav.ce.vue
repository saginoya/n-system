<script setup lang="ts">
import { useLinkComp } from '@/utils/useLinkComp'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()

const { getLinkCompName } = useLinkComp()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <component :is="getLinkCompName(link.type)" :href="link.path" class="text-white">
        {{ link.name }}
      </component>
    </li>
  </ul>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
