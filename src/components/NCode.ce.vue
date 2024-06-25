<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  html: string
  title?: string
}>()

const escapeHtml = (html: string) => {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(html))
  // 改行文字を <br> タグに置き換える
  const escapedHtml = div.innerHTML.replace(/\\n/g, '<br />')
  return escapedHtml
}

const escapedHtml = computed(() => {
  return escapeHtml(props.html)
})
</script>

<template>
  <div class="rounded bg-slate-800 text-white">
    <p v-if="title" class="px-1">
      <span class="bg-cyan-700 px-2">{{ title }}</span>
    </p>
    <pre class="whitespace-pre-wrap p-2"><code v-html="escapedHtml"></code></pre>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
