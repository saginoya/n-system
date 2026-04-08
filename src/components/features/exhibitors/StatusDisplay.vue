<script setup lang="ts">
import NCollapsible from '@/components/entries/interaction/NCollapsible.ce.vue'
import NContainerFlex from '@/components/entries/layouts/NContainerFlex.ce.vue'
import NChip from '@/components/entries/parts/NChip.ce.vue'
import type { Status } from '@/types/exhibitorList'

defineProps<{
  statusList: Status[]
}>()
</script>

<template>
  <component :is="statusList.length > 5 ? NCollapsible : 'div'">
    <NContainerFlex>
      <template v-for="status in statusList" :key="status.name">
        <NChip color="primary" size="sm" :closable="status.action">
          {{ status.name }}
        </NChip>
      </template>
    </NContainerFlex>
  </component>
</template>
