<script setup lang="ts">
import { useURL } from '@/utils/useURL'

defineProps<{
  links: []
  row: boolean
}>()

const { samePathname } = useURL()
</script>

<template>
  <ul>
    <li v-for="(link, index) in links" :key="index">
      <a
        :href="link.link"
        class="inline-block w-full rounded px-3 py-1 text-white hover:bg-white/20 focus:bg-white/20"
        :class="{ bg-black/20: samePathname(link.link), ic_openInNew: link.type === 'openInNew' }"
        :target="link.type === 'openInNew' ? '_blank' : '_self'"
      >
        {{ link.title }}
      </a>
    </li>
  </ul>
</template>

<style scoped>
@import url(../assets/css/main.css);

.bl_navList_item_link:focus,
.bl_navList_item_link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  opacity: 1;
}
</style>
