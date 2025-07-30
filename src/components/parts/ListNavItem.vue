<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { useRouter } from '@/composables/useRouter'
import { cn } from '@/lib/cn'
import { chipBase } from '@/styles'
import { isCurrentPage } from '@/utils'

const props = defineProps<{
  path: string
  class?: string
}>()

const router = useRouter().getLinkById(props.path)
const href = router?.href ?? ''
const type = router?.type ?? 'internal'
const name = router?.name ?? ''
</script>

<template>
  <LinkBox
    :href
    :type
    :class="
      cn(chipBase, 'text-inherit font-bold hover:bg-blue-200/30 focus:ring', props.class, {
        'opacity-50': isCurrentPage(href),
      })
    "
  >
    {{ name }}
  </LinkBox>
</template>
