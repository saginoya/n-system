<script setup lang="ts">
import LinkBox from '@/components/parts/LinkBox.vue'
import { useRouter } from '@/composables/useRouter'
import type { Navigation } from '@/types'

const props = defineProps<Navigation>()

const routers = useRouter().getByIds(props.children)

const commonClasses =
  'px-2 py-0.5 font-bold rounded-lg text-white hover:bg-blue-200/30 focus:bg-blue-200/30'
</script>

<template>
  <div>
    <template v-if="type === 'group'">
      <p v-if="type === 'group'" class="text-sm font-bold opacity-50">{{ name }}</p>

      <ul class="flex flex-col gap-1 py-2">
        <li v-for="link in routers" :key="link.id">
          <LinkBox :href="link.path" :type="link.type" :class="commonClasses">
            {{ link.name }}
          </LinkBox>
        </li>
      </ul>
    </template>
    <template v-else>
      <LinkBox :href="routers[0].path" :type="routers[0].type" :class="commonClasses">
        {{ name }}
      </LinkBox>
    </template>
  </div>
</template>
