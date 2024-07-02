<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    title?: string
    codeType?: 'html' | 'css' | 'json'
  }>(),
  {
    codeType: 'html'
  }
)

const escapeHtml = (html: string) => {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(html))
  return div.innerHTML
}
const replaceBreak = (code: string) => {
  return code.replace(/\\n/g, '<br />')
}

const escapedCode = computed(() => {
  let code = props.code
  if (props.codeType === 'html') {
    code = escapeHtml(code)
  }
  return replaceBreak(code)
})
</script>

<template>
  <div class="rounded bg-slate-800 text-white">
    <p v-if="title" class="px-1">
      <span class="bg-cyan-700 px-2">{{ title }}</span>
    </p>
    <pre class="whitespace-pre-wrap p-2"><code v-html="escapedCode"></code></pre>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
