<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed } from 'vue'

marked.setOptions({
  async: false,
})

const props = withDefaults(
  defineProps<{
    content: string
    isMarkdown?: boolean
  }>(),
  {
    isMarkdown: false,
  },
)

const sanitizedContent = computed(() => {
  const rawContent = props.isMarkdown ? (marked.parse(props.content) as string) : props.content
  return DOMPurify.sanitize(rawContent)
})
</script>

<template>
  <div class="prose prose-sm max-w-none" v-html="sanitizedContent" />
</template>
