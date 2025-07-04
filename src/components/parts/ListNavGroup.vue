<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { useRouter } from '@/composables/useRouter'
import { cn } from '@/lib/cn'
import type { Navigation } from '@/types'
import { isCurrentPage } from '@/utils'

const props = defineProps<Navigation>()

const routers = useRouter().getByIds(props.children)
</script>

<template>
  <div>
    <p class="px-2 text-sm font-bold opacity-80">{{ name }}</p>

    <ul class="flex flex-col gap-1 py-1">
      <li v-for="link in routers" :key="link.id">
        <LinkBox
          :href="link.path"
          :type="link.type"
          :class="
            cn('rounded-full px-2 py-1 text-white hover:bg-blue-200/30 focus:bg-blue-200/30', {
              'border border-current': isCurrentPage(link.path),
            })
          "
        >
          {{ link.name }}
        </LinkBox>
      </li>
    </ul>
  </div>
</template>
