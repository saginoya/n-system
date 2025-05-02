<script setup lang="ts">
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { computed } from 'vue'

marked.setOptions({
  async: false,
})

const props = withDefaults(
  defineProps<{
    content: string
    isMarkdown?: boolean
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
  }>(),
  {
    isMarkdown: false,
    allowedTags: () => ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
    allowedAttributes: () => ({
      a: ['href', 'target', 'rel'],
    }),
  },
)

const sanitizedContent = computed(() => {
  const rawContent = props.isMarkdown ? (marked.parse(props.content) as string) : props.content

  return sanitizeHtml(rawContent, {
    allowedTags: props.allowedTags,
    allowedAttributes: props.allowedAttributes,
  })
})
</script>

<template>
  <div class="prose prose-sm max-w-none" v-html="sanitizedContent" />
</template>
