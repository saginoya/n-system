<script setup lang="ts">
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps<{
  show: boolean
  message?: string
}>()
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center px-12">
    <TransitionRoot :show="show" as="template">
      <TransitionChild
        as="template"
        enter="transition-opacity duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <svg
          class="size-6 animate-spin text-slate-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <!-- 薄い円（固定） -->
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <!-- 濃い円（回転） -->
          <circle
            class="opacity-75"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="80"
            stroke-dashoffset="60"
          />
        </svg>
      </TransitionChild>
    </TransitionRoot>
    <span v-if="message" class="text-sm text-slate-600">{{ message }}</span>
  </div>
</template>
