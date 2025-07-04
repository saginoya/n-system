<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { useRouter } from '@/composables/useRouter'
import { cn } from '@/lib/cn'
import { isCurrentPage } from '@/utils'

const props = defineProps<{
  path: string
  class?: string
}>()

const router = useRouter().getById(props.path)
const href = router?.path ?? ''
const type = router?.type ?? 'internal'
const name = router?.name ?? ''

const commonClasses =
  'px-2 py-0.5 font-bold rounded-full text-white hover:bg-blue-200/30 focus:bg-blue-200/30'
</script>

<template>
  <LinkBox
    :href
    :type
    :class="cn(commonClasses, props.class, { 'border border-current': isCurrentPage(href) })"
  >
    {{ name }}
  </LinkBox>
</template>
