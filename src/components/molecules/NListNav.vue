<script setup lang="ts">
import NLinkBlock from '@/components/atoms/NLinkBlock.vue'
import type { Link } from '@/types/link'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(link, index) in links" :key="index">
      <NLinkBlock :href="link.path" :type="link.type" class="font-bold text-white">
        {{ link.name }}
      </NLinkBlock>
    </li>
  </ul>
</template>
